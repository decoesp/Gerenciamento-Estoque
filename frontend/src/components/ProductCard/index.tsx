import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../../types';

const useStyles = makeStyles({
  tableContainer: {
    borderRadius: '12px',
    boxShadow: '0px 1px 0px 0px #1A1A1A12, 0px 1px 0px 0px #CCCCCC80 inset, 0px -1px 0px 0px #0000002B inset, -1px 0px 0px 0px #00000021 inset, 1px 0px 0px 0px #00000021 inset',
    background: '#FFFFFF',
  },
  table: {
    width: '100%',
  },
  paginationButton: {
    width: '100%',
    height: '36px',
    padding: '8px 12px',
    borderRadius: '0px 0px 8px 8px',
    border: '1px solid transparent',
    background: 'linear-gradient(0deg, #E3E2E6, #E3E2E6), linear-gradient(0deg, #F3F3F3, #F3F3F3)',
    borderTop: '1px solid #E3E2E6',
    fontFamily: 'Inter',
    fontSize: '13px',
    fontWeight: 450,
    lineHeight: '20px',
    letterSpacing: '0px',
    textAlign: 'center',
    fontVariationSettings: "'slnt' 0",
  },
  editButton: {
    width: '28px',
    height: '28px',
    padding: '4px',
    borderRadius: '8px',
    boxShadow: '0px 1px 0px 0px #E3E3E3 inset, 1px 0px 0px 0px #E3E3E3 inset, -1px 0px 0px 0px #E3E3E3 inset, 0px -1px 0px 0px #B5B5B5 inset',
  },
  statusCell: {
    width: '86px',
    padding: '2px 8px',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: 550,
    lineHeight: '16px',
    letterSpacing: '0px',
    fontVariationSettings: "'slnt' 0",
  },
  availableStatus: {
    backgroundColor: '#006A651A',
    color: '#006A65 !important',
  },
  unavailableStatus: {
    backgroundColor: '#BA1A1A1A',
    color: '#BA1A1A !important',
  },
  tableHeader: {
    fontFamily: 'Inter',
    fontSize: '13px',
    fontWeight: 450,
    lineHeight: '20px',
    letterSpacing: '0px',
    textAlign: 'center',
    fontVariationSettings: "'slnt' 0",
  },
  tableText: {
    fontFamily: 'Inter',
    fontSize: '13px',
    fontWeight: 450,
    lineHeight: '20px',
    letterSpacing: '0px',
    textAlign: 'center',
    fontVariationSettings: "'slnt' 0",
    height: '30px',
  },
  Image: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '8px',
    border: '1px solid #ccc',
    padding: '4px 8px',
  },
});

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  const handleSort = (field: keyof Product) => {
    setOrderDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    setOrderBy(field);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const totalResults = products.length;

  const getStatusCellStyle = (status: string) => {
    return status === 'disponível' ? `${classes.statusCell} ${classes.availableStatus}` : `${classes.statusCell} ${classes.unavailableStatus}`;
  };

  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table} aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Produto</TableCell>
            <TableCell className={classes.tableHeader}>Descrição</TableCell>
            <TableCell className={classes.tableHeader}>
              Fornecedor 
              <IconButton onClick={() => handleSort('supplier')}>
                {orderBy === 'supplier' && orderDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </TableCell>
            <TableCell className={classes.tableHeader}>
              Categoria 
              <IconButton onClick={() => handleSort('category')}>
                {orderBy === 'category' && orderDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </TableCell>
            <TableCell className={classes.tableHeader}>
              Estoque 
              <IconButton onClick={() => handleSort('stock')}>
                {orderBy === 'stock' && orderDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </TableCell>
            <TableCell className={classes.tableHeader}>Status</TableCell>
            <TableCell className={classes.tableHeader}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell className={classes.tableText}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {product.photo && <img className={classes.Image} src={`http://localhost:5000/${product.photo}`} alt="Imagem do Item" />}
                  {product.name}
                </div>
                </TableCell>
              <TableCell className={classes.tableText}>{product.description}</TableCell>
              <TableCell className={classes.tableText}>{product.supplier}</TableCell>
              <TableCell className={classes.tableText}>{product.category}</TableCell>
              <TableCell className={classes.tableText}>{product.stock}</TableCell>
              <TableCell className={getStatusCellStyle(product.status)}>{product.status}</TableCell>
              <TableCell>
              <Link to={`/edit/${product.id}`} className={classes.editButton}>
                  <EditOutlinedIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalResults > endIndex && (
        <Button
          className={classes.paginationButton}
          onClick={handleClick}
          style={{ background: '#44474E', color: '#F3F3F3' }}
        >
          Mostrar Mais
        </Button>
      )}
      <Typography
        variant="body2"
        className={classes.tableText}
        style={{ color: '#44474E', background: '#F3F3F3' }}
      >
        Mostrando {Math.min(endIndex, totalResults)} de {totalResults} resultados
      </Typography>
    </div>
  );
};

export default ProductCard;
