import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHostVillages } from "@/hooks/useVillages";
import { getVillageImageUrl, uploadVillageImage, updateVillageImagePath } from "@/utils/storage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const HostDashboard = () => {
  const { villages, loading, createVillage, updateVillage, deleteVillage } = useHostVillages();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingVillage, setEditingVillage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    description: "",
    nightly_price: "",
    guide_fee: "",
    hero_image: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { url, error } = await uploadVillageImage(file, editingVillage?.id || profile?.id || 'temp');
      
      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        hero_image: url,
      }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      state: "",
      description: "",
      nightly_price: "",
      guide_fee: "",
      hero_image: ""
    });
    setSelectedFile(null);
    setEditingVillage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const villageData = {
      name: formData.name,
      state: formData.state,
      description: formData.description,
      nightly_price: formData.nightly_price ? parseFloat(formData.nightly_price) : null,
      guide_fee: formData.guide_fee ? parseFloat(formData.guide_fee) : null,
      hero_image: formData.hero_image || null,
    };

    try {
      if (editingVillage) {
        // For editing, just update with current data
        await updateVillage(editingVillage.id, villageData);
        toast({
          title: "Success",
          description: "Village updated successfully",
        });
      } else {
        // For new village, first create without image
        const createResponse = await createVillage({
          ...villageData,
          hero_image: null
        });
        
        if (createResponse.error) throw createResponse.error;
        
        // If we have a file to upload, do it now with the real village ID
        if (selectedFile && createResponse.data?.id) {
          const { url, error } = await uploadVillageImage(selectedFile, createResponse.data.id);
          if (error) throw error;
          
          // Update village with the final image URL
          await updateVillage(createResponse.data.id, {
            ...villageData,
            hero_image: url
          });
        }

        toast({
          title: "Success",
          description: "Village created successfully",
        });
      }
    } catch (error) {
      console.error("Error saving village:", error);
      toast({
        title: "Error",
        description: "Failed to save village",
        variant: "destructive",
      });
      return;
    }

    resetForm();
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (village: any) => {
    setEditingVillage(village);
    setFormData({
      name: village.name,
      state: village.state || "",
      description: village.description || "",
      nightly_price: village.nightly_price?.toString() || "",
      guide_fee: village.guide_fee?.toString() || "",
      hero_image: village.hero_image || ""
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (villageId: string) => {
    if (confirm('Are you sure you want to delete this village?')) {
      await deleteVillage(villageId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-village-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Host Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {profile?.full_name}! Manage your village listings here.
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Villages ({villages.length})</h2>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Village
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>{editingVillage ? 'Edit Village' : 'Add New Village'}</DialogTitle>
                  <DialogDescription>
                    {editingVillage ? 'Update your village information' : 'Create a new village listing to welcome guests.'}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Village Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter village name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Location</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State or location"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your village..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nightly_price">Nightly Price (₹)</Label>
                      <Input
                        id="nightly_price"
                        name="nightly_price"
                        type="number"
                        value={formData.nightly_price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guide_fee">Guide Fee (₹)</Label>
                      <Input
                        id="guide_fee"
                        name="guide_fee"
                        type="number"
                        value={formData.guide_fee}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Hero Image</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      {uploading && (
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Uploading...</span>
                        </div>
                      )}
                    </div>
                    {formData.hero_image && (
                      <div className="mt-2">
                        <img 
                          src={getVillageImageUrl(formData.hero_image)} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={uploading}>
                      {editingVillage ? 'Update Village' : 'Create Village'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {villages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">No villages yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first village listing to start welcoming guests.
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Village
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {villages.map((village) => (
                <Card key={village.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={getVillageImageUrl(village.hero_image)} 
                      alt={village.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{village.name}</CardTitle>
                    <CardDescription>{village.state}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {village.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        {village.nightly_price && (
                          <div className="text-sm">
                            <span className="font-semibold">₹{village.nightly_price}</span>
                            <span className="text-muted-foreground">/night</span>
                          </div>
                        )}
                        {village.guide_fee && (
                          <div className="text-xs text-muted-foreground">
                            Guide: ₹{village.guide_fee}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(village)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(village.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HostDashboard;