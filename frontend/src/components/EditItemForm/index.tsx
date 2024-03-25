import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Button, Card, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChangeHistoryModal from "../ChangeHistoryModal";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


interface Item {
  id: number;
  photo: string;
  name: string;
  description: string;
  supplier: string;
  category: string;
  status: string;
  stock: number;
}

interface EditItemFormProps {
  itemId: number;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ itemId }) => {
  const [item, setItem] = useState<Item>({
    id: itemId,
    photo: "",
    name: "",
    description: "",
    supplier: "",
    category: "",
    status: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do item:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/items/edit/${item.id}`, item);
      console.log("Alterações do item salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações do item:", error);
    }
  };

  const handleRemoveImage = () => {
    setItem({ ...item, photo: "" });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleToggleStatus = () => {
    setItem({
      ...item,
      status: item.status === "disponível" ? "Indisponível" : "disponível",
    });
  };

  const getStatusInfo = () => {
    return item.status === "disponível"
      ? {
          text: "O produto está visível e contando no estoque.",
          bgColor: "#006A651A",
          textColor: "#006A65",
        }
      : {
          text: "O produto está invisível e não está contando no estoque.",
          bgColor: "#BA1A1A1A",
          textColor: "#BA1A1A",
        };
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/items/${item.id}`);
      console.log("Item excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="/edit/id" method="put" encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <span>Nome:</span>
          <TextField
            name="name"
            value={item.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            InputProps={{
              style: { border: "1px solid #E3E2E6", borderRadius: "8px" },
            }}
          />
          <span>Descrição:</span>
          <TextField
            name="description"
            value={item.description}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            InputProps={{
              style: { border: "1px solid #E3E2E6", borderRadius: "8px" },
            }}
          />
          <span>Fornecedor:</span>
          <TextField
            name="supplier"
            value={item.supplier}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            InputProps={{
              style: { border: "1px solid #E3E2E6", borderRadius: "8px" },
            }}
          />
          <span>Categoria:</span>
          <TextField
            name="category"
            value={item.category}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            InputProps={{
              style: { border: "1px solid #E3E2E6", borderRadius: "8px" },
            }}
          />
          <span>Estoque:</span>
          <TextField
            name="stock"
            type="number"
            value={item.stock}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 4 }}
            InputProps={{
              style: { border: "1px solid #E3E2E6", borderRadius: "8px" },
            }}
          />
          <div className="mt-8">
            <ChangeHistoryModal itemId={itemId} />
          </div>
          <div className="mt-8 flex justify-between">
            <Button
              onClick={() => console.log("Cancelar")}
              variant="text"
              className="rounded-lg"
              sx={{ color: '#005BBE' }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              className=" px-4 py-2 rounded-xl flex items-center"
              sx={{
                color: '#FFFFFF',
                bgcolor: '#005BBE',
                boxShadow: '0px -1px 0px 0px #B5B5B5 inset' 
              }}
              type="submit"
            >
              <DoneIcon />
              Salvar Alterações
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <h2>Imagem</h2>
          <div
            className="bg-[#FDFDFD]"
            style={{
              border: "1px dashed #ccc",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              width: "50%",
              height: "50%",
            }}
          >
{item.photo && <img src={`http://localhost:5000/${item.photo}`} alt="Imagem do Item" />}

          </div>
          <Button
            onClick={handleRemoveImage}
            variant="text"
            sx={{ color: '#005BBE' }}
            className="mt-2"
          >
            Remover Imagem
          </Button>
          <Card className="mt-4" sx={{ padding: '10px 0px 30px 30px;' }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" align="left" sx={{ padding: '0px 12px 0px 0px', fontFamily: 'Inter', fontSize: '13px', fontWeight: 650, lineHeight: '20px', letterSpacing: '0px', textAlign: 'left', fontVariationSettings: "'slnt' 0" }}>
              Status
            </Typography>
              <Typography
                variant="body1"
                align="left"
                sx={{
                  backgroundColor: getStatusInfo().bgColor,
                  color: getStatusInfo().textColor,
                  borderRadius: "8px",
                  p: 1,
                  mt: 1,
                  width: "fit-content",
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 650,
                  lineHeight: '20px',
                  letterSpacing: '0px',
                  textAlign: 'left',
                  fontVariationSettings: "'slnt' 0"
                }}
              >
                {item.status}
              </Typography>
              </div>
              <Typography
              variant="body2"
              align="left"
              sx={{
                mt: 1,
                ml: 1,
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: 650,
                lineHeight: '20px',
                letterSpacing: '0px',
                textAlign: 'left',
                fontVariationSettings: "'slnt' 0",
                margin: "20px 0px 20px 0px"
              }}
            >
              {getStatusInfo().text}
            </Typography>
              <Button
                variant="contained"
                onClick={handleToggleStatus}
                sx={{
                  color: '#44474E',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0px 1px 0px 0px #E3E3E3 inset, 1px 0px 0px 0px #E3E3E3 inset, -1px 0px 0px 0px #E3E3E3 inset, 0px -1px 0px 0px #B5B5B5 inset',
                  borderRadius: '8px',
                  mt: 1,
                  ml: 1,
                  '&:hover': {
                    bgcolor: 'transparent', 
                  },
                }}
              >
                {item.status === "disponível" ? "Desabilitar" : "Habilitar"}
              </Button>
           

          </Card>

          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={handleDeleteItem}
            disabled={item.status === "disponível"}
            sx={{ mt: 2, mb: 4 }}
          >
            Excluir Item
          </Button>
          {item.status === "disponível" && (
            <Typography variant="body2" sx={{ color: "#303030", fontFamily: 'Inter', fontSize: '13px', fontWeight: 650, lineHeight: '20px', letterSpacing: '0px', textAlign: 'left', fontVariationSettings: "'slnt' 0" }}>
              <InfoOutlinedIcon sx={{ fontSize: "small", mr: 1 }} />
              Para excluir este item, você precisa desabilitá-lo primeiro.
            </Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default EditItemForm;
