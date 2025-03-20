import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, useMediaQuery } from '@mui/material';



const WorkDetailModal = ({ handleClose, open }) => {

    const isMobile = useMediaQuery('(max-width:600px)');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '40rem',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 20,
        p: 2,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='font-bold mb-2 border-b text-center text-base'>CHI TIẾT CÔNG VIỆC</div>
                    <div className="flex flex-col space-y-2 rounded-md mx-auto">
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">ID</span>
                            <span>1</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">TV Cần Sửa</span>
                            <span>TV Samsung QLED QE1D 4K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">TV Modal</span>
                            <span>QA65QE1DAKXXV</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">TV Serial</span>
                            <span>48T49W841K3285</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">Số INCH</span>
                            <span>65</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">Ghi Chú</span>
                            <span></span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">Ngày giao</span>
                            <span>2/9/2025</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold">Trạng thái sửa chữa</span>
                            <span>Hoàn thành</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <Button size='small' variant="contained" color="warning">Yêu cầu linh kiện</Button>
                            <Button size='small' variant="contained" color="primary">Cập nhật tiến độ</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default WorkDetailModal;