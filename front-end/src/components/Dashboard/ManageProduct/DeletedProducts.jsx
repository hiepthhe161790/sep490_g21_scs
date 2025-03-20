import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import SpecsDialog from './SpecsDialog';
import InStockDialog from './InStockDialog';
import DescDialog from './DescDialog'
import ImageDialog from './ImageDialog'

export default function DeletedProducts({ productData }) {
  return (
    <React.Fragment>
      <Title>Sản phẩm đã xóa</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Hãng</TableCell>
            <TableCell>Danh mục</TableCell>
            <TableCell>Đang bán</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Thông số kỹ thuật</TableCell>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Kho</TableCell>
            <TableCell>Giá nhập</TableCell>
            <TableCell align="right">Giá bán</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData && productData.products?.map((product, index) => (
            <TableRow style={{ cursor: 'pointer' }} key={index} >
              <TableCell>
                <React.Fragment>
                  {product?.name}
                </React.Fragment>
              </TableCell>
              <TableCell>
                <React.Fragment>
                  {product?.brand}
                </React.Fragment>
              </TableCell>
              <TableCell>
                <React.Fragment>
                  {product?.category}
                </React.Fragment>
              </TableCell>
              <TableCell>
                <React.Fragment>
                  {product?.isAvailable ? 'Có' : 'Không'}
                </React.Fragment>
              </TableCell>
              <TableCell >
                <React.Fragment>
                  <DescDialog description={product?.description}></DescDialog>
                </React.Fragment>
              </TableCell>
              <TableCell >
                <React.Fragment>
                  <SpecsDialog specs={product?.specs}></SpecsDialog>
                </React.Fragment>
              </TableCell>
              <TableCell >
                <React.Fragment>
                  <ImageDialog images={product?.images}></ImageDialog>
                </React.Fragment>
              </TableCell>
              <TableCell >
                <React.Fragment>
                  <InStockDialog inStock={product?.inStock}></InStockDialog>
                </React.Fragment>
              </TableCell>
              <TableCell>
                <React.Fragment>
                  {`$${product?.cost}`}
                </React.Fragment>
              </TableCell>
              <TableCell align="right">
                <React.Fragment>
                  {`$${product?.price}`}
                </React.Fragment>
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
