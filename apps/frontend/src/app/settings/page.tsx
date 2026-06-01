/**
 * Settings Page
 * User settings and configuration
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Bell, Lock, User, Shield, LogOut, Save } from 'lucide-react';

export default function SettingsPage() {
  // TODO: Fetch user settings from API
  // TODO: Implement setting updates
  // TODO: Add notification preferences
  // TODO: Add security settings
  // TODO: Add 2FA setup
  // TODO: Add session management
  // TODO: Add data export

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-600">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Menu */}
        <div className="space-y-2">
          <nav className="space-y-1">
            {[
              { icon: User, label: 'Profile', id: 'profile' },
              { icon: Bell, label: 'Notifications', id: 'notifications' },
              { icon: Lock, label: 'Security', id: 'security' },
              { icon: Shield, label: 'Privacy', id: 'privacy' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-left text-sm font-medium hover:bg-slate-50"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="space-y-4 lg:col-span-2">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TODO: Add form inputs */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TODO: Add notification preference toggles */}
              {['Payment Received', 'Consolidation Complete', 'Security Alerts', 'System Updates'].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <label className="text-sm font-medium">{item}</label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              ))}
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TODO: Implement 2FA setup */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-600">Not enabled</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-medium text-sm mb-3">Change Password</p>
                <input
                  type="password"
                  placeholder="Current password"
                  className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="mb-4 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">Danger Zone</CardTitle>
              <CardDescription className="text-red-700">Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" className="gap-2 w-full">
                <LogOut className="h-4 w-4" />
                Logout from All Devices
              </Button>
              <Button variant="destructive" className="gap-2 w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
