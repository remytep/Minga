// in src/Settings.js
import * as React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { useState } from "react";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";


const StripeCouponShow = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    const [coupon, setCoupon] = useState({});
    const [customer, setCustomer] = useState();
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


    if (coupon.customer) {
        axios.get(process.env.REACT_APP_ENTRYPOINT + "/customer/" + coupon.customer)
            .then((res) => {
                setCustomer(res.data.email);
            })
    }

    console.log(coupon)
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
                    defaultValue={coupon.code}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    label="Type"
                    defaultValue={coupon.coupon.amount_off ? "Amount" : "Percent"}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
                {customer &&
                    <TextField
                        label="Customer"
                        fullWidth
                        defaultValue={customer}
                        InputProps={{
                            readOnly: true,
                        }}
                    />}
                {coupon.coupon.percent_off &&
                    <TextField
                        label="Value"
                        fullWidth
                        defaultValue={coupon.coupon.percent_off}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                }
                {coupon.coupon.amount_off &&
                    <TextField
                        label="Value"
                        defaultValue={coupon.coupon.amount_off + " " + coupon.coupon.currency.toUpperCase()}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                }
                <TextField
                    type="number"
                    label="Number of redemptions"
                    defaultValue={coupon.coupon.max_redemptions}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    type="number"
                    label="Times redeemed"
                    defaultValue={coupon.coupon.times_redeemed}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
                {coupon.restrictions.minimum_amount &&
                    <TextField
                        label="Minimum amount required"
                        defaultValue={coupon.restrictions.minimum_amount + " " + coupon.restrictions.minimum_amount_currency.toUpperCase()}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                }

                <FormControlLabel
                    control={<Checkbox
                        disabled
                        checked={coupon.restrictions.first_time_transaction}
                    />}
                    label="First time transaction only"

                />

                <InputLabel id="date">Created at</InputLabel>
                <TextField
                    id="date"
                    type="datetime-local"
                    defaultValue={coupon.created && moment.unix(coupon.created).format("YYYY-MM-DD[T]HH:mm")}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <InputLabel id="date">Expires in</InputLabel>
                <TextField
                    id="date"
                    type="datetime-local"
                    defaultValue={coupon.expires_at && moment.unix(coupon.expires_at).format("YYYY-MM-DD[T]HH:mm")}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />

            </Box>
        );
}

export default StripeCouponShow;