'use client';
import { useState, useEffect } from 'react';
import AddOthersForm from './AddOthersForm';

const ManageOthers = () => {
  const [activeTab, setActiveTab] = useState('brands');
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [data, setData] = useState({
    brands: [],
    glass_orientation: [],
    installation: [],
    fueltype: []
  });
  const [loading, setLoading] = useState(false);

  const tableConfig = {
    brands: {
      label: 'Brands',
      table: 'tbl_brands',
      columns: ['brand_name', 'brand_logo_url', 'brand_desc', 'slug',  'is_active']
    },
    glass_orientation: {
      label: 'Glass Orientation',
      table: 'tbl_glass_orientation',
      columns: ['glass_orientation_name', 'slug']
    },
    installation: {
      label: 'Installation',
      table: 'tbl_installation',
      columns: ['installation_name', 'slug']
    },
    fueltype: {
      label: 'Fuel Type',
      table: 'tbl_fueltype',
      columns: ['fueltype_name', 'fueltype_desc', 'slug']
    }
  };

  const fetchData = async (table) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/add-others?table=${table}`);
      const result = await response.json();
      
      if (result.success) {
        setData(prev => ({
          ...prev,
          [activeTab]: result.data
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const table = tableConfig[activeTab].table;
    fetchData(table);
  }, [activeTab]);

  const handleDeactivate = async (id) => {
    if (!confirm('Are you sure you want to deactivate this item?')) return;

    try {
      const table = tableConfig[activeTab].table;
      const response = await fetch('/api/add-others', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deactivate',
          table,
          id,
          data: {
            updated_by: 'admin'
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Item deactivated successfully!');
        fetchData(table);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deactivating item:', error);
      alert('Error deactivating item');
    }
  };

  const handleEdit = (item) => {
    setEditingData(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingData(null);
  };

  // const getDisplayValue = (item, column) => {
  //   const value = item[column];
  //   if (column.includes('_url') && value) {
  //     return <img src={value} alt={item.name} className="h-8 w-8 object-cover rounded" />;
  //   }
  //   return value || '-';
  // };
  const getDisplayValue = (item, column) => {
  const value = item[column];
  
  // Handle URL columns (logos)
  if (column.includes('_url') && value) {
    return (
      <img 
        src={value} 
        alt={item.brand_name || item.name} 
        className="h-8 w-8 object-cover rounded"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    );
  }
  
  // Handle boolean columns (is_active)
  if (column === 'is_active') {
    return value ? 'Active' : 'Inactive';
  }
  
  // Handle empty values
  return value || '-';
};

  const getRecordId = (item, table) => {
    const idMap = {
      'tbl_brands': item.brand_id,
      'tbl_glass_orientation': item.glass_orientation_id,
      'tbl_installation': item.installation_id,
      'tbl_fueltype': item.fueltype_id
    };
    return idMap[table];
  };

  const currentConfig = tableConfig[activeTab];

  return (
    <div className="p-6" style={{ marginTop:"100px" }}>
      <h1 className="text-2xl font-bold mb-6">Manage Data</h1>

      <div className="mb-4 flex justify-between items-center">
      <button
        onClick={() => window.location.href = '/admin'}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
      >
        ← Back to Admin
      </button>
    </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(tableConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {config.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Add New Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            setEditingData(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add New {currentConfig.label.slice(0, -1)}
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md">
            <AddOthersForm
              table={currentConfig.table}
              tableLabel={currentConfig.label.slice(0, -1)}
              onClose={handleCloseForm}
              refreshData={() => fetchData(currentConfig.table)}
              editData={editingData}
            />
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {currentConfig.columns.map(column => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {column.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data[activeTab].map((item) => (
                <tr key={getRecordId(item, currentConfig.table)}  className="hover:bg-gray-50">
                  {currentConfig.columns.map(column => (
                    <td key={column} 
                    className={`px-4 py-3 text-sm text-gray-900 ${
      column.includes('_desc') ? 'max-w-xs truncate' : 'whitespace-nowrap'
    }`}

                    // className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs"
                    title={column.includes('_desc') ? item[column] : ''}
                    >
                      {getDisplayValue(item, column)}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeactivate(getRecordId(item, currentConfig.table))}
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {data[activeTab].length === 0 && (
                <tr>
                  <td 
                    colSpan={currentConfig.columns.length + 1}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageOthers;