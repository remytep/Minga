// in src/Settings.js
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
import moment from "moment";
import { useEffect } from "react";


const StripeCouponShow = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    const [coupon, setCoupon] = useState({});

    let path = window.location.pathname;
    let couponId = path.substring(path.lastIndexOf("/") + 1);

    useEffect(() => {
        axios.get(process.env.REACT_APP_ENTRYPOINT + "/coupon/" + couponId)
            .then((res) => {
                if (res.data.lenght === 0) {
                    return setCoupon(null);
                }
                setCoupon(res.data);
                setLoaded(false);
            })
    }, [true])

    if (!loaded)
        return (
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
                    defaultValue={coupon.name}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    label="Type"
                    defaultValue={coupon.amount_off ? "Amount" : "Percent"}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
                {coupon.percent_off &&
                    <TextField
                        label="Value"
                        fullWidth
                        defaultValue={coupon.percent_off}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                }
                {coupon.amount_off &&
                    <TextField
                        label="Value"
                        defaultValue={coupon.amount_off + " " + coupon.currency.toUpperCase()}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                }
                <TextField
                    type="number"
                    label="Number of redemptions"
                    defaultValue={coupon.max_redemptions}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <InputLabel id="date">Expires in</InputLabel>
                <TextField
                    id="date"
                    type="datetime-local"
                    defaultValue={coupon.redeem_by && moment.unix(coupon.redeem_by).format("YYYY-MM-DD[T]HH:mm")}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />

            </Box>
        );
}

export default StripeCouponShow;