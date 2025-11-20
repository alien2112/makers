import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'MAKERS Electronics',
    siteEmail: 'admin@makers.com',
    maintenanceMode: false,
    allowRegistrations: true,
    orderAutoConfirm: false,
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="admin-settings">
      <motion.div
        className="settings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="card-title">General Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Site Email</label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) => handleChange('siteEmail', e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="settings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h3 className="card-title">System Settings</h3>
        <div className="settings-form">
          <div className="toggle-group">
            <div className="toggle-item">
              <div className="toggle-info">
                <label>Maintenance Mode</label>
                <p>Enable to put the site in maintenance mode</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <label>Allow Registrations</label>
                <p>Allow new users to register</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.allowRegistrations}
                  onChange={(e) => handleChange('allowRegistrations', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <label>Auto Confirm Orders</label>
                <p>Automatically confirm new orders</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.orderAutoConfirm}
                  onChange={(e) => handleChange('orderAutoConfirm', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="settings-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>
        <button className="cancel-btn">Cancel</button>
      </motion.div>
    </div>
  );
};

export default AdminSettings;


