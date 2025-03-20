import * as React from 'react';
import { useContext, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
    Zoom, Fab, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Paper, Grid, MenuItem, Input, InputLabel, InputAdornment, FormControl,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter,
    Button, Typography, IconButton, FormHelperText
} from '@mui/material';
import {
    Add as AddIcon, AddBox as AddBoxIcon, IndeterminateCheckBox as IndeterminateCheckBoxIcon,
    CloudUpload as CloudUploadIcon, Close as CloseIcon, Info as InfoIcon, Cancel as CancelIcon,
} from '@mui/icons-material';
import CategoryService from '../../../services/api/CategoryService';
import BrandService from '../../../services/api/BrandService';
import ProductService from '../../../services/api/ProductService';
import Notification from './Notification';
import { PublicContext } from '../../../contexts/publicContext';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AddProduct({ onAddProductSuccess }) {
    // các state nhỏ
    const [openAddProductDialog, setOpenAddProductDialog] = React.useState(false);
    const [openAddCategoryDialog, setOpenAddCategoryDialog] = React.useState(false);
    const [openAddBrandDialog, setOpenAddBrandDialog] = React.useState(false);
    const [keySpecs, setKeySpecs] = React.useState("");
    const [valueSpecs, setValueSpecs] = React.useState("");
    const [colorInstock, setColorInstock] = React.useState("");
    const [quantityInstock, setQuantityInstock] = React.useState(0);
    const [newBrand, setNewBrand] = React.useState({});
    const [newCategory, setNewCategory] = React.useState({});
    const { categories, brands, refreshData } = useContext(PublicContext);
    const [errors, setErrors] = React.useState({});
    // Các state form data
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [specs, setSpecs] = React.useState([]);
    const [instock, setInstock] = React.useState([]);
    const [price, setPrice] = React.useState(0);
    const [cost, setCost] = React.useState(0);
    const [isAvailable, setIsAvaiable] = React.useState(true);
    const [images, setImages] = React.useState([]);
    const [modelNumber, setModelNumber] = React.useState("");
    const [warrantyPeriod, setWarrantyPeriod] = React.useState(0);
    const [imagePreviews, setImagePreviews] = React.useState([]);
    // Xử lý notification
    const [showNotification, setShowNotification] = React.useState(false);
    const [contentNotification, setContentNotification] = React.useState("");
    const [severity, setSeriverity] = React.useState("info");
    const handleShowNotification = (isShowNotification) => {
        setShowNotification(isShowNotification);
    }
    // Xong phần xử lý notification

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleResetForm = () => {
        setKeySpecs("");
        setValueSpecs("");
        setColorInstock("");
        setQuantityInstock(0);

        setName("");
        setModelNumber("");
        setWarrantyPeriod(0);
        setDescription("");
        setBrand("");
        setCategory("");
        setSpecs([]);
        setInstock([]);
        setPrice(0);
        setCost(0);
        setIsAvaiable(true);
        setImages([]);
        setImagePreviews([]);
    }
    const validateForm = () => {
        let newErrors = {};

        if (!name.trim()) newErrors.name = "Tên sản phẩm không được để trống!";
        if (!modelNumber.trim()) newErrors.modelNumber = "Model không được để trống!";
        // if (!description.trim()) newErrors.description = "Mô tả không được để trống!";
        if (!brand) newErrors.brand = "Vui lòng chọn thương hiệu!";
        if (!category) newErrors.category = "Vui lòng chọn danh mục!";
        // if (!price || price  <= 0) newErrors.price = "Giá phải lớn hơn 0!";
        // if (!cost || cost <= 0) newErrors.cost = "Chi phí không hợp lệ!";
        // if (instock.length === 0) newErrors.instock = "Vui lòng thêm màu sắc & số lượng!";
        // if (specs.length === 0) newErrors.specs = "Vui lòng thêm ít nhất một thông số!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
    };
    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await ProductService.addProduct(
                name, description, brand, category, price, cost,
                isAvailable, specs, instock, images, modelNumber, warrantyPeriod
            );

            if (response?.success) {
                setShowNotification(true);
                setContentNotification("Add product successfully!");
                setSeriverity("success");
                handleResetForm();
                onAddProductSuccess();
            } else {
                throw new Error(response?.message);
            }
        } catch (error) {
            console.error("Add product error:", error);
            setShowNotification(true);
            setContentNotification(error.message);
            setSeriverity("error");
        }
    };



    const handleCreateCategory = async () => {
        await CategoryService.createCategory(newCategory);
        setOpenAddCategoryDialog(false);
        refreshData();
    }

    const handleCreateBrand = async () => {
        await BrandService.createBrand(newBrand);
        setOpenAddBrandDialog(false);
        refreshData();
    }

    const handleAddSpecs = () => {
        if (keySpecs.trim() !== "" && valueSpecs.trim() !== "") {
            setSpecs(prev => {
                return [
                    ...prev,
                    {
                        key: keySpecs,
                        value: valueSpecs
                    }
                ];
            });
            setKeySpecs("");
            setValueSpecs("");
        }
    };

    const handleAddInstock = () => {
        // if (colorInstock.trim() !== "" && quantityInstock.trim() !== "") {
        if (colorInstock.trim() !== "") {
            setInstock(prev => {
                return [
                    ...prev,
                    {
                        color: isNaN(colorInstock) ? colorInstock : `${colorInstock} inch`,
                        quantity: quantityInstock
                    }
                ];
            });
            setColorInstock("");
            setQuantityInstock(0);
        }
    };

    const handleDeleteSpecs = (specsItem) => {
        const newData = specs.filter(item => {
            return item !== specsItem
        })
        setSpecs(newData)
    };

    const handleDeleteInstock = (instockItem) => {
        const newData = instock.filter(item => {
            return item !== instockItem
        })
        setInstock(newData)
    };

    const handleClickOpenAddBrandDialog = () => {
        setOpenAddBrandDialog(true);
    };

    const handleCloseAddBrandDialog = () => {
        setOpenAddBrandDialog(false);
    };

    const handleClickOpenAddCategoryDialog = () => {
        setOpenAddCategoryDialog(true);
    };

    const handleCloseAddCategoryDialog = () => {
        setOpenAddCategoryDialog(false);
    };

    const handleClickOpenAddProductDialog = () => {
        setOpenAddProductDialog(true);
    };
    const handleCloseAddProductDialog = () => {
        setOpenAddProductDialog(false);
    };
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    return (
        <>
            <Tooltip title="Thêm sản phẩm" placement="left">
                <Zoom
                    key='primary'
                    in={true}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${transitionDuration.exit}ms`,
                    }}
                    unmountOnExit
                >

                    <Fab aria-label='Add' color='primary' >
                        <React.Fragment>
                            <AddIcon onClick={handleClickOpenAddProductDialog}></AddIcon>
                            <Dialog
                                open={openAddProductDialog}
                                onClose={handleCloseAddProductDialog}
                                maxWidth="md"
                            >
                                <DialogTitle>Thêm mới sản phẩm</DialogTitle>
                                <DialogContent>
                                    <Notification handleShowNotification={handleShowNotification} showNotification={showNotification} contentNotification={contentNotification} severity={severity} ></Notification>
                                    <DialogContentText>
                                        Để thêm sản phẩm mới vào cửa hàng, vui lòng điền thông tin bên dưới và gửi yêu cầu.
                                    </DialogContentText>
                                    <DialogContentText style={{ color: 'red', margin: '16px 0', fontSize: '14px', fontWeight: 'bold' }}>
                                        Lưu ý:
                                        <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                            <li>-Khi một sản phẩm được thêm vào, nó không thể bị xóa khỏi hệ thống.</li>
                                            <li>-Các trường có dấu (*) là bắt buộc.</li>
                                        </ul>
                                    </DialogContentText>
                                    <Grid sx={{ mt: 3 }} container spacing={2}>
                                        <Grid item xs={3}>
                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Tải ảnh lên
                                                <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" multiple onChange={handleImageChange} />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" gutterBottom>
                                                {images.length} đã tải lên
                                            </Typography>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                                marginTop: '10px'
                                            }}>
                                                {imagePreviews.map((src, index) => (
                                                    <div key={index} style={{
                                                        position: 'relative',
                                                        width: '100px',
                                                        height: '100px'
                                                    }}>
                                                        <img
                                                            src={src}
                                                            alt={`preview-${index}`}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                                borderRadius: '8px'
                                                            }}
                                                        />
                                                        <IconButton
                                                            onClick={() => handleRemoveImage(index)}
                                                            size="small"
                                                            sx={{
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0,
                                                                color: "white",
                                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                                "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" }
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                    </div>
                                                ))}
                                            </div>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth id="model-input"
                                                label="Số Model*"
                                                variant="standard"
                                                value={modelNumber}
                                                onChange={e => setModelNumber(e.target.value)}
                                                error={!!errors.modelNumber}
                                                helperText={errors.modelNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="number"
                                                fullWidth id="warranty-input"
                                                label="Thời gian bảo hành (tháng)*"
                                                variant="standard"
                                                value={warrantyPeriod}
                                                onChange={e => setWarrantyPeriod(e.target.value)}
                                                error={!!errors.warrantyPeriod}
                                                helperText={errors.warrantyPeriod}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth id="standard-basic"
                                                label="Tên sản phẩm*" variant="standard"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                error={!!errors.name}
                                                helperText={errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                label="Hãng*"
                                                helperText="Chọn hãng"
                                                variant="standard"
                                                fullWidth
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                                error={!!errors.brand}
                                            >
                                                {brands.map((brand) => (
                                                    <MenuItem key={brand?._id} value={brand?._id}>
                                                        {brand?.name}
                                                    </MenuItem>
                                                ))}
                                                <MenuItem sx={{ diplay: 'flex', justifyContent: 'center' }} onClick={handleClickOpenAddBrandDialog}>
                                                    <AddIcon color="primary" >
                                                    </AddIcon>
                                                </MenuItem>
                                                {errors.brand && <p style={{ color: 'red' }}>{errors.brand}</p>}
                                            </TextField>
                                            <Dialog
                                                open={openAddBrandDialog}
                                                onClose={handleCloseAddBrandDialog}
                                            >
                                                <DialogTitle>Thêm mới hãng</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Vui lòng nhập đầy đủ thông tin sau để thêm một hãng mới. Lưu ý rằng khi một hãng mới được thêm vào, nó không thể bị xóa khỏi hệ thống.
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus

                                                        margin="dense"
                                                        label="Tên hãng"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        onChange={(e) => setNewBrand(prev => ({
                                                            ...prev,
                                                            name: e.target.value
                                                        }))}
                                                    />
                                                    <TextField

                                                        sx={{ mt: 3 }}
                                                        id="outlined-multiline-static"
                                                        label="Mô tả"
                                                        multiline
                                                        rows={4}
                                                        fullWidth
                                                        onChange={(e) => setNewBrand(prev => ({
                                                            ...prev,
                                                            description: e.target.value
                                                        }))}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseAddBrandDialog}>Hủy</Button>
                                                    <Button onClick={handleCreateBrand}>Tạo</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                label="Danh mục*"
                                                helperText="Chọn danh mục"
                                                variant="standard"
                                                fullWidth
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                error={!!errors.category}
                                            >
                                                {categories.length > 0 && categories.map((cate) => (
                                                    <MenuItem key={cate?._id} value={cate?._id}>
                                                        {cate?.name}
                                                    </MenuItem>
                                                ))}
                                                <MenuItem sx={{ diplay: 'flex', justifyContent: 'center' }} onClick={handleClickOpenAddCategoryDialog} >
                                                    <AddIcon color="primary" >
                                                    </AddIcon>
                                                </MenuItem>
                                                {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                                            </TextField>
                                            <Dialog
                                                open={openAddCategoryDialog}
                                                onClose={handleCloseAddCategoryDialog}
                                            >
                                                <DialogTitle>Tạo mới Danh mục</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Vui lòng nhập đầy đủ thông tin sau để thêm một danh mục mới. Lưu ý rằng khi một danh mục mới được thêm vào, nó không thể bị xóa khỏi hệ thống.
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus

                                                        margin="dense"
                                                        label="Tên danh mục"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        value={newCategory?.name}
                                                        onChange={(e) => setNewCategory(prev => ({
                                                            ...prev,
                                                            name: e.target.value
                                                        }))}
                                                    />
                                                    <TextField

                                                        sx={{ mt: 3 }}
                                                        id="outlined-multiline-static"
                                                        label="Mô tả"
                                                        multiline
                                                        rows={4}
                                                        fullWidth
                                                        value={newCategory?.description}
                                                        onChange={(e) => setNewCategory(prev => ({
                                                            ...prev,
                                                            description: e.target.value
                                                        }))}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseAddCategoryDialog}>Hủy</Button>
                                                    <Button onClick={handleCreateCategory}>Thêm</Button>
                                                </DialogActions>

                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="filled-textarea"
                                                variant="filled"
                                                label="Mô tả sản phẩm"
                                                multiline
                                                rows={3}
                                                fullWidth
                                                value={description} onChange={e => setDescription(e.target.value)}
                                                error={!!errors.description}
                                                helperText={errors.description}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TableContainer component={Paper}>
                                                <Table size="small" >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2} style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                                Thông số kỹ thuật
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell style={{ fontWeight: 'bold' }}>
                                                                Thuộc tính
                                                            </TableCell>
                                                            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                                                                Mô tả
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            specs.length > 0 && specs.map((spec, index) => {
                                                                return (
                                                                    <React.Fragment key={index}>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">
                                                                                {spec.key}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {spec.value}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                <IndeterminateCheckBoxIcon style={{ cursor: 'pointer' }} fontSize="medium" color="error" onClick={() => handleDeleteSpecs(spec)}></IndeterminateCheckBoxIcon>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row">
                                                                <TextField id="standard-basic" label="Khóa" value={keySpecs} variant="standard" onChange={event => setKeySpecs(event.target.value)} />
                                                            </TableCell>
                                                            <TableCell >
                                                                <TextField id="standard-basic" label="Giá trị" value={valueSpecs} variant="standard" onChange={event => setValueSpecs(event.target.value)} />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <AddBoxIcon style={{ cursor: 'pointer' }} fontSize="medium" color="primary" onClick={handleAddSpecs}></AddBoxIcon>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                            {errors.specs && <FormHelperText error>{errors.specs}</FormHelperText>}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TableContainer component={Paper}>
                                                <Table size="small" >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2} style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                                Trong kho còn
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell style={{ fontWeight: 'bold' }}>Kích thước</TableCell>

                                                            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                                                                Số lượng
                                                                <Tooltip title="Số lượng sẽ được cập nhật theo số sê-ri." arrow>
                                                                    <IconButton size="small" style={{ padding: 2 }}>
                                                                        <InfoIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            instock.length > 0 && instock.map((item, index) => {
                                                                return (
                                                                    <React.Fragment key={index}>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">
                                                                                {item.color}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {item.quantity}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                <IndeterminateCheckBoxIcon style={{ cursor: 'pointer' }} fontSize="medium" color="error" onClick={() => handleDeleteInstock(item)}></IndeterminateCheckBoxIcon>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row">
                                                                <TextField id="standard-basic" label="Inch" variant="standard" value={colorInstock} onChange={event => setColorInstock(event.target.value)} />
                                                            </TableCell>
                                                            <TableCell >
                                                                {/* <TextField id="standard-basic" type="number" label="Quantity" variant="standard" value={quantityInstock} onChange={event => setQuantityInstock(event.target.value)} /> */}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <AddBoxIcon style={{ cursor: 'pointer' }} fontSize="medium" color="primary" onClick={handleAddInstock}></AddBoxIcon>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                            {errors.instock && <FormHelperText error>{errors.instock}</FormHelperText>}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth sx={{ m: 1 }} variant="standard" error={!!errors.price}>
                                                <InputLabel htmlFor="standard-adornment-amount">Giá bán</InputLabel>
                                                <Input
                                                    id="standard-adornment-amount"
                                                    type="number"
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    value={price}
                                                    onChange={e => setPrice(e.target.value)}
                                                    min={0}
                                                />
                                                <Typography variant="caption" color="error">{errors.price}</Typography>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth sx={{ m: 1 }} variant="standard" error={!!errors.cost}>
                                                <InputLabel htmlFor="standard-adornment-amount">Giá nhập</InputLabel>
                                                <Input
                                                    id="standard-adornment-amount"
                                                    type="number"
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    value={cost}
                                                    onChange={e => setCost(e.target.value)}
                                                    min={0}
                                                />
                                                <Typography variant="caption" color="error">{errors.cost}</Typography>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                label="Sản phẩm đang được bán?"
                                                variant="standard"
                                                fullWidth
                                                value={isAvailable}
                                                onChange={e => setIsAvaiable(e.target.value)}
                                            >
                                                <MenuItem value="true">
                                                    Có
                                                </MenuItem>
                                                <MenuItem value="false">
                                                    Không
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseAddProductDialog}>Hủy bỏ</Button>
                                    <Button type="submit" onClick={handleAddProduct}>Tạo mới</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    </Fab>
                </Zoom>
            </Tooltip>
        </>

    );
}
