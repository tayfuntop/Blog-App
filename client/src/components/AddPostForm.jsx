import React, { useState } from "react";
import { makeStyles } from 'tss-react/mui';
import {
    Button, TextField, Select, Input, MenuItem, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Upload, message } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { createPost } from "../redux/actions/post";

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            marginTop: theme.spacing(1),
        },
        paper: {
            padding: theme.spacing(2),
        },
        TextField: {
            marginBottom: theme.spacing(2),
        },
        center: {
            textAlign: 'center',
        }
    };
});

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.mixed().oneOf(tags),
});

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const mapDispatchToProps = (dispatch) => ({ dispatch });

const AddPostForm = connect(
    mapDispatchToProps
)(
    ({ open, handleClose, dispatch }) => {

        const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
            resolver: yupResolver(postSchema),
        });
        const [previewOpen, setPreviewOpen] = useState(false);
        const [previewImage, setPreviewImage] = useState("");
        const [previewTitle, setPreviewTitle] = useState("");
        const [fileList, setFileList] = useState([]);
        const handleCancel = () => setPreviewOpen(false);
        const handlePreview = async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        };
        const handleChange = ({ fileList: newFileList }) => {
            setFileList(newFileList);
            newFileList.length !== 0 && handlePreview(newFileList[0]);
        };
        
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </div>
        );
        const props = {
            beforeUpload: (file) => {
                const isImage = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg');
                if (!isImage) {
                    message.open({
                        content: 'You can only upload JPG/PNG/JPEG file!',
                        duration: 3,
                        type: 'error',
                    });
                }
                return isImage === true ? false : Upload.LIST_IGNORE;
            },
        };

        const clearForm = () => {
            reset();
            setFileList([]);
            handleClose();
        };

        const onSubmit = (data) => {
            if (fileList.length === 0) {
                message.open({
                    content: 'You have to upload image!',
                    duration: 3,
                    type: 'error',
                });
            } else {
                const newData = { ...data, image: fileList[0].preview };
                dispatch(createPost(newData));
                clearForm();
            }
        };

        const { classes } = useStyles();

        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Yeni bir yazı oluşturmak için aşağıdaki formu doldurun.
                    </DialogContentText>
                    <div className={classes.root}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="title"
                                label="Başlık"
                                name="title"
                                variant="outlined"
                                className={classes.TextField}
                                size="small"
                                {...register('title', { required: true })}
                                fullWidth
                                error={errors.title ? true : false}
                            />
                            <TextField
                                id="subtitle"
                                label="Alt Başlık"
                                name="subtitle"
                                variant="outlined"
                                className={classes.TextField}
                                size="small"
                                {...register('subtitle', { required: true })}
                                error={errors.subtitle ? true : false}
                                fullWidth
                            />
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        input={<Input />}
                                        className={classes.TextField}
                                        fullWidth
                                    >
                                        {
                                            tags.map((tag, index) => {
                                                return (
                                                    <MenuItem key={index} value={tag}>
                                                        {tag}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                )}
                                name="tag"
                                control={control}
                                error={errors.tag ? true : false}
                                defaultValue={tags[0]}
                            />
                            <TextField
                                id="content"
                                label="İçerik"
                                name="content"
                                multiline
                                rows={4}
                                variant="outlined"
                                className={classes.TextField}
                                size="small"
                                {...register('content', { required: true })}
                                error={errors.content ? true : false}
                                fullWidth
                            />
                            <Upload
                                className={classes.center}
                                {...props}
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} zIndex={9999} footer={null} onCancel={handleCancel}>
                                <img
                                    alt="example"
                                    style={{
                                        width: '100%',
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearForm} color="inherit">Vazgeç</Button>
                    <Button onClick={() => handleSubmit(onSubmit)()} type="submit" variant="outlined" color="primary">Yayınla</Button>
                </DialogActions>
            </Dialog>
        );
    });

export default AddPostForm;