import * as React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from 'moment'

const StripeCouponEdit = () => {
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState({});
    const [defaultCoupon, setDefaultCoupon] = useState({});
    const [loaded, setLoaded] = useState(true);

    const schema = yup.object({
        name: yup.string().required("Name is empty."),
    }).required();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    let path = window.location.pathname;
    let couponId = path.substring(path.lastIndexOf("/") + 1);

    useEffect(() => {
        axios.get(process.env.REACT_APP_ENTRYPOINT + "/coupon/" + couponId)
            .then((res) => {
                if (res.data.lenght === 0) {
                    return setCoupon(null);
                }
                setCoupon(res.data);
                setDefaultCoupon(res.data);
                setLoaded(false);
            })
    }, [true])

    const putCoupon = () => {
        axios.put(process.env.REACT_APP_ENTRYPOINT + "/coupon", coupon)
            .then((res) => {
                navigate('/admin/coupon', {
                    state: 'updated'
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    if (!loaded)
        return (

            <form
                onSubmit={handleSubmit(putCoupon)}
                className="flex justify-center"
            >
                <Box
                    sx={{
                        width: "80vw",
                        maxWidth: '100%',
                        marginTop: "50px"
                    }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        defaultValue={coupon.name}
                        helperText={errors.name && errors.name.message}
                        fullWidth
                        onChange={(e) => {
                            setCoupon({ ...coupon, name: e.target.value });
                        }}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!!(JSON.stringify(coupon) == JSON.stringify(defaultCoupon))}
                    >
                        Save
                    </Button>

                </Box>

            </form>
        );
}

export default StripeCouponEdit;