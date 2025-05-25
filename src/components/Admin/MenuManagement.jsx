import React, { useState, useEffect, useCallback } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const initialFormData = {
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    is_available: true,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [editingItemId, setEditingItemId] = useState(null);

  const apiBaseUrl = '/api/admin/menu';

  const clearMessages = () => {
    setError(null);
    setSuccessMessage('');
  };

  const fetchMenuItems = useCallback(async () => {
    setIsLoading(true);
    clearMessages();
    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch menu items: ${response.statusText}`);
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
      // console.error("Fetch menu items error:", err); // Removed for cleanup
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearMessages();

    const method = editingItemId ? 'PUT' : 'POST';
    const url = editingItemId ? `${apiBaseUrl}/${editingItemId}` : apiBaseUrl;
    
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      is_available: formData.is_available ? 1 : 0,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || `Failed to ${editingItemId ? 'update' : 'add'} item`);
      }
      setSuccessMessage(`Menu item ${editingItemId ? 'updated' : 'added'} successfully!`);
      await fetchMenuItems(); 
      setFormData(initialFormData); 
      setEditingItemId(null); 
    } catch (err) {
      setError(err.message);
      // console.error("Submit item error:", err); // Removed for cleanup
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (item) => {
    clearMessages();
    setEditingItemId(item.id);
    setFormData({
      name: item.name || '',
      description: item.description || '',
      price: item.price !== undefined ? String(item.price) : '',
      image_url: item.image_url || '',
      category: item.category || '',
      is_available: item.is_available !== undefined ? Boolean(item.is_available) : true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    
    setIsDeleting(itemId); 
    clearMessages();
    try {
      const response = await fetch(`${apiBaseUrl}/${itemId}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete item`);
      }
      setSuccessMessage('Menu item deleted successfully!');
      await fetchMenuItems(); 
    } catch (err) {
      setError(err.message);
      // console.error("Delete item error:", err); // Removed for cleanup
    } finally {
      setIsDeleting(null); 
    }
  };

  const handleCancelEdit = () => {
    clearMessages();
    setFormData(initialFormData);
    setEditingItemId(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Menu Item Management</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-medium mb-4">{editingItemId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full" disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <Input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} required step="0.01" className="w-full" disabled={isSubmitting} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows="3" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" disabled={isSubmitting}></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Input type="text" name="category" id="category" value={formData.category} onChange={handleInputChange} className="w-full" disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <Input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full" disabled={isSubmitting} />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="is_available" id="is_available" checked={formData.is_available} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" disabled={isSubmitting} />
          <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">Is Available?</label>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        {successMessage && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{successMessage}</p>}
        
        <div className="flex items-center space-x-3 pt-2">
          <Button type="submit" variant="primary" disabled={isSubmitting} className="flex items-center">
            {isSubmitting ? (
              <>
                <Loader size="small" /> 
                <span className="ml-2">{editingItemId ? 'Updating...' : 'Adding...'}</span>
              </>
            ) : (editingItemId ? 'Update Item' : 'Add Item')}
          </Button>
          {editingItemId && (
            <Button type="button" variant="secondary" onClick={handleCancelEdit} disabled={isSubmitting}>
              Cancel Edit
            </Button>
          )}
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Current Menu Items</h3>
        {isLoading && menuItems.length === 0 && <div className="text-center py-4"><Loader size="large" /></div>}
        {!isLoading && !error && menuItems.length === 0 && <p>No menu items found. Add some using the form above.</p>}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">${item.price ? item.price.toFixed(2) : '0.00'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{item.category || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{item.is_available ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="outline" size="small" onClick={() => handleEditClick(item)} className="text-blue-600 border-blue-500 hover:bg-blue-50" disabled={isSubmitting || isDeleting === item.id}>Edit</Button>
                    <Button variant="outline" size="small" onClick={() => handleDeleteItem(item.id)} className="text-red-600 border-red-500 hover:bg-red-50 flex items-center" disabled={isSubmitting || isDeleting === item.id}>
                      {isDeleting === item.id ? (
                        <>
                          <Loader size="small" />
                          <span className="ml-1">Deleting...</span>
                        </>
                      ) : 'Delete'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
