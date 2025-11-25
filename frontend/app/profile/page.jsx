"use client"
import React, { useState, useEffect } from 'react'
import { User, Mail, Calendar, Camera, Edit3, Save, X, Settings, Shield, Bell } from 'lucide-react'
import { toast } from 'react-toastify'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [previewImage, setPreviewImage] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch(`${url}/auth/profile`, {
          method: 'GET',
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          setFormData(data.user)
        } else {
          setErrorMsg('Failed to fetch profile data')
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        toast.error('Network error occurred')
      } finally {
        setLoading(false)
      }
    }
    getUserProfile()
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result)
        setFormData({ ...formData, profilepic: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfile = async () => {
    setSaving(true)
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      const response = await fetch('https://notepad-backend-3fo1.onrender.com/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setEditing(false)
        setPreviewImage(null)
        setSuccessMsg('Profile updated successfully!')
        setTimeout(() => setSuccessMsg(null), 3000)
      } else {
        const errorData = await response.json()
        setErrorMsg(errorData.message || 'Failed to update profile')
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      toast.error('Network error occurred')
    } finally {
      setSaving(false)
    }
  }

  const cancelEdit = () => {
    setFormData(user)
    setEditing(false)
    setPreviewImage(null)
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (errorMsg && !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading profile</div>
          <p className="text-gray-600">{errorMsg}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {errorMsg}
          </div>
        )}
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-48 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                    <img 
                      src={previewImage || user?.profilepic || 'https://via.placeholder.com/150'} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editing && (
                    <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-all duration-200 shadow-lg">
                      <Camera size={16} />
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
                <div className="flex-1 text-white pb-4">
                  {editing ? (
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="text-3xl font-bold bg-transparent border-b-2 border-white/50 focus:border-white outline-none placeholder-white/70" placeholder="Your Name"/>
                  ) : (
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                  )}
                  <p className="text-white/90 text-lg mt-1">NotePad User</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="text-blue-600" size={24} />
                  Personal Information
                </h2>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                    <Edit3 size={16} />Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={saveProfile} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50">
                      <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={cancelEdit} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200">
                      <X size={16} />Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {editing ? (
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter your full name"/>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800"> {user?.name || 'Not provided'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    {user?.email || 'Not provided'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                    <Shield size={16} className="text-gray-500" />
                    {user?.provider === 'google' ? 'Google Account' : 'Local Account'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-blue-100">Total Notes</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-purple-100">This Week</div>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-xl">
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-pink-100">Days Active</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <Settings className="text-gray-500" size={20} />
                  <span>Account Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <Bell className="text-gray-500" size={20} />
                  <span>Notifications</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <Shield className="text-gray-500" size={20} />
                  <span>Privacy</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Account Active</span>
              </div>
              <p className="text-sm text-green-700">
                Your account is in good standing. All features are available.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get support or learn more about NotePad features.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
