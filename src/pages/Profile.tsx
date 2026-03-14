import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Phone, MapPin, Briefcase, Camera, Shield, Save } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'System',
    lastName: 'Manager',
    email: 'admin@factory.com',
    phone: '+65 9123 4567',
    role: 'Admin',
    department: 'Maintenance & Operations',
    location: 'Plant A - Main Building',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save the updated data in a real app
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
          {isEditing ? (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          ) : (
            'Edit Profile'
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar Profile Card */}
        <Card className="col-span-1 border-t-4 border-t-blue-500">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-gray-200 shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h2>
            <p className="text-gray-500 text-sm flex items-center justify-center gap-1 mt-1">
              <Shield className="w-3 h-3 text-blue-500" /> {formData.role}
            </p>

            <div className="w-full mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{formData.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Detail Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            <h3 className="text-lg font-semibold text-gray-900 mt-2">Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-9 bg-gray-50 text-gray-500"
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="pl-9 bg-gray-50 text-gray-500"
                    readOnly
                  />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
