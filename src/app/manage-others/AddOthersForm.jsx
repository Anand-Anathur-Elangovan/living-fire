// // components/AddOthersForm.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { generateSlug } from '@/src/helper/slug/slug';

// const AddOthersForm = ({ table, tableLabel, onClose, refreshData }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     logo_url: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [slug, setSlug] = useState('');

//   useEffect(() => {
//     if (formData.name) {
//       setSlug(generateSlug(formData.name));
//     }
//   }, [formData.name]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('/api/add-others', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           table,
//           data: {
//             ...formData,
//             created_by: 'admin' // You can get this from auth context
//           }
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         alert(`${tableLabel} created successfully!`);
//         setFormData({ name: '', description: '', logo_url: '' });
//         setSlug('');
//         refreshData();
//         onClose();
//       } else {
//         alert(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       console.error('Error creating record:', error);
//       alert('Error creating record');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({ name: '', description: '', logo_url: '' });
//     setSlug('');
//     onClose();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h3 className="text-lg font-semibold mb-4">Add New {tableLabel}</h3>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Name *
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder={`Enter ${tableLabel.toLowerCase()} name`}
//           />
//         </div>

//         {table === 'tbl_brands' && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Logo URL
//             </label>
//             <input
//               type="url"
//               name="logo_url"
//               value={formData.logo_url}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter logo URL"
//             />
//           </div>
//         )}

//         {(table === 'tbl_brands' || table === 'tbl_fueltype') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder={`Enter ${tableLabel.toLowerCase()} description`}
//             />
//           </div>
//         )}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Slug (Auto-generated)
//           </label>
//           <input
//             type="text"
//             value={slug}
//             readOnly
//             className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
//             placeholder="Slug will be generated automatically"
//           />
//         </div>

//         <div className="flex justify-end space-x-3 pt-4">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//           >
//             {loading ? 'Creating...' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddOthersForm;

// components/AddOthersForm.jsx
// components/AddOthersForm.jsx
'use client';
import { useState, useEffect } from 'react';
import { generateSlug } from '@/src/helper/slug/slug';

const AddOthersForm = ({ table, tableLabel, onClose, refreshData, editData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState('');

  // Initialize form with edit data if provided
  useEffect(() => {
    if (editData) {
      const fieldMap = {
        'tbl_brands': {
          name: editData.brand_name,
          description: editData.brand_desc,
          logo_url: editData.brand_logo_url
        },
        'tbl_glass_orientation': {
          name: editData.glass_orientation_name
        },
        'tbl_installation': {
          name: editData.installation_name
        },
        'tbl_fueltype': {
          name: editData.fueltype_name,
          description: editData.fueltype_desc
        }
      };

      setFormData(fieldMap[table] || { name: '', description: '', logo_url: '' });
      setSlug(editData.slug || '');
    } else {
      setFormData({ name: '', description: '', logo_url: '' });
      setSlug('');
    }
  }, [editData, table]);

  useEffect(() => {
    if (formData.name && !editData) {
      setSlug(generateSlug(formData.name));
    }
  }, [formData.name, editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/add-others';
      const method = editData ? 'PUT' : 'POST';
      
      const payload = editData 
        ? {
            action: 'edit',
            table,
            id: getRecordId(editData, table),
            data: {
              ...formData,
              updated_by: 'admin'
            }
          }
        : {
            table,
            data: {
              ...formData,
              created_by: 'admin'
            }
          };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert(`${tableLabel} ${editData ? 'updated' : 'created'} successfully!`);
        setFormData({ name: '', description: '', logo_url: '' });
        setSlug('');
        refreshData();
        onClose();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(`Error ${editData ? 'updating' : 'creating'} record:`, error);
      alert(`Error ${editData ? 'updating' : 'creating'} record`);
    } finally {
      setLoading(false);
    }
  };

  const getRecordId = (data, tableName) => {
    const idMap = {
      'tbl_brands': data.brand_id,
      'tbl_glass_orientation': data.glass_orientation_id,
      'tbl_installation': data.installation_id,
      'tbl_fueltype': data.fueltype_id
    };
    return idMap[tableName];
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', logo_url: '' });
    setSlug('');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {editData ? 'Edit' : 'Add New'} {tableLabel}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${tableLabel.toLowerCase()} name`}
          />
        </div>

        {table === 'tbl_brands' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              type="url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter logo URL"
            />
          </div>
        )}

        {(table === 'tbl_brands' || table === 'tbl_fueltype') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${tableLabel.toLowerCase()} description`}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug {!editData && '(Auto-generated)'}
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            readOnly={!editData}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !editData ? 'bg-gray-100 text-gray-500' : ''
            }`}
            placeholder="Slug will be generated automatically"
          />
          {editData && (
            <p className="text-xs text-gray-500 mt-1">
              Slug will be regenerated if you change the name
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (editData ? 'Updating...' : 'Creating...') : (editData ? 'Update' : 'Submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOthersForm;