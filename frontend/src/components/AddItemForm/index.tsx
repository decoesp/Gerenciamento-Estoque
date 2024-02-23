import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const AddItemForm: React.FC = () => {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    name: '',
    description: '',
    supplier: '',
    category: '',
    stock: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { photo, name, description, supplier, category, stock } = formData;
      console.log('Objeto FormData:', formData);

      const data = new FormData();
      // Adicione os campos ao FormData
      data.append('photo', photo ?? '');
      data.append('name', name);
      data.append('description', description);
      data.append('supplier', supplier);
      data.append('category', category);
      data.append('stock', stock);
  
      // Certifique-se de que a solicitação POST seja feita após adicionar os dados ao FormData
      await axios.post('http://localhost:5000/items/add', data);
  
      console.log('New item added successfully!');
      
      // Limpe o formulário após o envio
      setFormData({
        photo: null,
        name: '',
        description: '',
        supplier: '',
        category: '',
        stock: '',
      });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`Campo ${name} alterado para: ${value}`);
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log('Arquivo de imagem selecionado:', file);
      setFormData({ ...formData, photo: file });
    }
  };

  const handleUploadButtonClick = () => {
    const input = document.getElementById('upload-photo');
    if (input) {
      input.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} action="/items/add" method="post" encType="multipart/form-data">
      <Grid container spacing={2}>
        {/* Lado Esquerdo */}
        <Grid item xs={6}>
          {/* Texto acima dos campos */}
          <span>Nome:</span>
          <TextField
            label="Nome"
            type='text'
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            InputProps={{
              style: { border: '1px solid #E3E2E6', borderRadius: '8px' },
            }}
          />
          <span>Descrição:</span>
          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            InputProps={{
              style: { border: '1px solid #E3E2E6', borderRadius: '8px' },
            }}
          />
          <span>Fornecedor:</span>
          <TextField
            label="Fornecedor"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            InputProps={{
              style: { border: '1px solid #E3E2E6', borderRadius: '8px' },
            }}
          />
          <span>Categoria:</span>
          <TextField
            label="Categoria"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            InputProps={{
              style: { border: '1px solid #E3E2E6', borderRadius: '8px' },
            }}
          />
          <span>Estoque:</span>
          <TextField
            label="Estoque"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            InputProps={{
              style: { border: '1px solid #E3E2E6', borderRadius: '8px' },
            }}
          />
        </Grid>
        {/* Lado Direito */}
        <Grid item xs={6}>
          <div
            className="bg-[#FDFDFD]"
            style={{ border: '1px dashed #ccc', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '8px' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {formData.photo ? (
              <img src={URL.createObjectURL(formData.photo)} alt="Imagem Selecionada" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              <>
                <label htmlFor="upload-photo" className="flex flex-col items-center space-y-2 cursor-pointer">
                  <button
                    className="bg-[#FFFFFF] text-[#44474E] px-4 py-2 rounded-lg flex items-center gap-2"
                    style={{ boxShadow: '0px 1px 0px 0px #E3E3E3 inset, 1px 0px 0px 0px #E3E3E3 inset, -1px 0px 0px 0px #E3E3E3 inset, 0px -1px 0px 0px #B5B5B5 inset', width: 'fit-content', height: 'fit-content', borderRadius: '8px', marginBottom: '8px' }}
                    onClick={handleUploadButtonClick}
                  >
                    <FileUploadOutlinedIcon />
                    Upload Foto
                  </button>
                  <input id="upload-photo" type="file" name="photo" hidden onChange={handleImageChange} />
                </label>
                <p style={{ color: '#333333', fontSize: '14px' }}>Arraste e solte ou selecione uma imagem</p>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <button className="bg-[#005BBE] text-white px-4 py-2 rounded-xl flex items-center" type="submit">
        <AddIcon />
        Cadastrar
      </button>
    </form>
  );
};

export default AddItemForm;
