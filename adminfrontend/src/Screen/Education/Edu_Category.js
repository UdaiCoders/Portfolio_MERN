import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Grid,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Edu_Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1', image: 'image1.jpg', status: 'Active', createdAt: '2022-01-01' },
    { id: 2, name: 'Category 2', image: 'image2.jpg', status: 'Inactive', createdAt: '2022-01-05' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', image: null, status: 'Active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBulkAction = (e) => {
    const bulkAction = e.target.value;
    if (bulkAction === 'delete') {
      setCategories(categories.filter(category => !selectedCategories.includes(category.id)));
      setSelectedCategories([]);
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEdit = (id) => {
    const categoryToEdit = categories.find(category => category.id === id);
    setNewCategory(categoryToEdit);
    setImagePreview(categoryToEdit.image); // Preview the existing image
    setShowForm(true);
  };

  const handleAddNewCategory = () => {
    setShowForm(true);
    setNewCategory({ name: '', image: null, status: 'Active' });
    setImagePreview(null); // Reset image preview for new category
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newCategory.id) {
      setCategories(categories.map(category =>
        category.id === newCategory.id ? { ...newCategory, image: imagePreview, createdAt: category.createdAt } : category
      ));
    } else {
      const newCategoryId = categories.length + 1;
      const newCategoryData = { ...newCategory, id: newCategoryId, image: imagePreview, createdAt: new Date().toISOString() };
      setCategories([...categories, newCategoryData]);
    }
    setShowForm(false);
    setNewCategory({ name: '', image: null, status: 'Active' });
    setImagePreview(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewCategory({ ...newCategory, image: file });
    setImagePreview(URL.createObjectURL(file)); // Generate a URL for image preview
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewCategory({ name: '', image: null, status: 'Active' });
    setImagePreview(null);
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ margin: '30px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            All Categories
          </Typography>
          <Button color="inherit" onClick={handleAddNewCategory}>+ Add New Category</Button>
        </Toolbar>
      </AppBar>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <div>
          <FormControl variant="outlined" style={{ marginRight: '10px', width: '150px' }}>
            <InputLabel>Bulk Actions</InputLabel>
            <Select onChange={handleBulkAction} defaultValue="">
              <MenuItem value="">
                <em>Bulk Actions</em>
              </MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">Apply</Button>
        </div>

        <div>
          <TextField
            variant="outlined"
            placeholder="Search categories"
            onChange={handleSearch}
            style={{ marginRight: '10px' }}
          />
          <IconButton>
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </div>
      </div>

      {showForm && (
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            borderRadius: 1,
            padding: 2,
            boxShadow: 3,
            backgroundColor: 'white',
            marginBottom: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {newCategory.id ? 'Edit Category' : 'Add New Category'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category Name"
                name="name"
                value={newCategory.name}
                onChange={handleFormChange}
                required
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            
              <input
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="upload-button"
              />
              <label htmlFor="upload-button">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <div style={{ marginTop: '10px' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={newCategory.status} onChange={handleFormChange} label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCancelForm} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={(e) => {
                    setSelectedCategories(e.target.checked ? categories.map(c => c.id) : []);
                  }}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                </TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{category.status}</TableCell>
                <TableCell>{category.createdAt}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(category.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Edu_Category;
