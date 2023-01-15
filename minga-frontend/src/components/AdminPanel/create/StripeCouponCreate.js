// in src/Settings.js
import * as React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const StripeCouponCreate = () => {
    const navigate = useNavigate();

    const currencies = ["USD", "EUR", "GBP", "JPY", "CHF"];
    const [customers, setCustomers] = useState();
    const [coupon, setCoupon] = useState({
        type: "percent_off",
        currency: "EUR",
        redeem_by: null,
        max_redemptions: null
    });
    const [codePromo, setCodePromo] = useState({
        restrictions: {
            minimum_amount_currency: "EUR",
        }
    })
    const schema = yup.object({
        name: yup.string().required("Name is empty."),
        type: yup.string(),
        customer: yup.string(),
        code: yup.string().required("Code is empty."),
        minimum_amount: yup.number()
            .nullable(true)
            .min(100)
            .transform((_, val) => !isNaN(Math.sign(val)) ? Number(val) : null),

        percent_off: yup.mixed()
            .when("type", {
                is: "percent_off",
                then: yup
                    .number()
                    .min(0, 'Value must be greater than or equal to 0.')
                    .max(100, 'Value must be less than or equal to 100.')
                    //check if the value is null
                    .transform((_, val) => !isNaN(Math.sign(val)) ? Number(val) : null)
            }),
        amount_off: yup.mixed()
            .when("type", {
                is: "amount_off",
                then: yup.number()
                    .min(0, 'Value must be greater than or equal to 0.')
                    .transform((_, val) => !isNaN(Math.sign(val)) ? Number(val) : null)
            }),
        first_time_transaction: yup.boolean(),

        max_redemptions: yup.number()
            .min(0, "Number of redemptions must be greater than or equal to 0.")
            .transform((_, val) => !isNaN(Math.sign(val)) ? Number(val) : null)

    }).required();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const postCoupon = () => {
        axios.post(process.env.REACT_APP_ENTRYPOINT + "/coupon", { coupon, codePromo })
            .then((res) => {
                navigate('/admin/panel/coupon', {
                    state: 'created'
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_ENTRYPOINT + "/customers")
            .then((res) => {
                let filteredCustomers = res.data.filter((customer) => {
                    if (Object.keys(customer.metadata).length > 0) {
                        return customer;
                    }
                })
                setCustomers(filteredCustomers);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [true])


    console.log(coupon)

    return (

        <form
            onSubmit={handleSubmit(postCoupon)}
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
                    label="Name *"
                    variant="outlined"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name && errors.name.message}
                    fullWidth
                    onChange={(e) => {
                        setCoupon({ ...coupon, name: e.target.value });
                    }}
                />

                <InputLabel id="type">Customer</InputLabel>
                <Select
                    labelId="type"
                    {...register("customer")}
                    fullWidth
                    onChange={(e) => {
                        setCodePromo({ ...codePromo, customer: e.target.value });
                    }}
                >
                    {customers && customers.map((customer, i) => (
                        <MenuItem key={i} value={customer.id}>{customer.email}</MenuItem>
                    ))}

                </Select>

                <FormControlLabel
                    {...register("first_time_transaction")}
                    control={<Checkbox
                        onChange={(e) => {
                            setCodePromo({ ...codePromo, restrictions: { ...codePromo.restrictions, first_time_transaction: e.target.checked } });
                        }} />}
                    label="First time transaction only"

                />



                <InputLabel id="type">Type</InputLabel>
                <Select
                    labelId="type"
                    {...register("type")}
                    fullWidth
                    defaultValue={"percent_off"}
                    onChange={(e) => {
                        setCoupon({ ...coupon, type: e.target.value });
                    }}
                >
                    <MenuItem value={"amount_off"}>Amount</MenuItem>
                    <MenuItem value={"percent_off"}>Percent</MenuItem>
                </Select>
                {coupon.type === "percent_off" &&
                    <TextField
                        type="number"
                        inputProps={{
                            step: "0.01"
                        }}
                        label="Value *"
                        {...register("percent_off")}
                        error={!!errors.percent_off}
                        helperText={errors.percent_off && errors.percent_off.message}
                        fullWidth
                        onChange={(e) => {
                            console.log(e.target.value)
                            setCoupon({
                                ...coupon, percent_off: e.target.value, amount_off: null
                            });
                        }}
                    />}
                {coupon.type === "amount_off" &&
                    <>
                        <TextField
                            type="number"
                            label="Value *"
                            {...register("amount_off")}
                            error={!!errors.amount_off}
                            helperText={errors.amount_off && errors.amount_off.message}
                            fullWidth
                            onChange={(e) => {
                                setCoupon({
                                    ...coupon, amount_off: e.target.value, percent_off: null
                                });
                            }}
                        />
                        <InputLabel id="currency">Currency</InputLabel>
                        <Select
                            labelId="currency"
                            fullWidth
                            defaultValue={"EUR"}
                            onChange={(e) => {
                                setCoupon({ ...coupon, currency: e.target.value });
                            }}
                        >
                            {currencies.map((currency, i) => {
                                return (
                                    <MenuItem key={i} value={currency}>
                                        {currency}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </>
                }
                <TextField
                    label="Promotion code *"
                    {...register("code")}
                    error={!!errors.code}
                    helperText={errors.code && errors.code.message}
                    fullWidth
                    onChange={(e) => {
                        setCodePromo({
                            ...codePromo, code: e.target.value
                        });
                    }}
                />
                <div className="flex w-full items-center justify-evenly">
                    <TextField
                        type="number"
                        fullWidth
                        label="Minimum amout of transaction"
                        {...register("minimum_amount")}
                        error={!!errors.minimum_amount}
                        helperText={errors.minimum_amount && errors.minimum_amount.message}
                        onChange={(e) => {
                            setCodePromo({
                                ...codePromo, restrictions: { ...codePromo.restrictions, minimum_amount: e.target.value }
                            });
                        }}
                    />
                    {coupon.type === "percent_off" &&

                        <div className="w-full">
                            <InputLabel id="currency">Currency</InputLabel>
                            <Select
                                fullWidth
                                labelId="currency"
                                defaultValue={"EUR"}
                                onChange={(e) => {
                                    setCodePromo({ ...codePromo, restrictions: { ...codePromo.restrictions, minimum_amount_currency: e.target.value } });
                                }}
                            >
                                {currencies.map((currency, i) => {
                                    return (
                                        <MenuItem key={i} value={currency}>
                                            {currency}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                    }

                </div>

                <TextField
                    type="number"
                    label="Number of redemptions"
                    {...register("max_redemptions")}
                    error={!!errors.max_redemptions}
                    helperText={errors.max_redemptions && errors.max_redemptions.message}
                    fullWidth
                    onChange={(e) => {
                        setCoupon({
                            ...coupon, max_redemptions: e.target.value
                        });
                    }}
                />

                <InputLabel id="date">Expires in</InputLabel>
                <TextField
                    id="date"
                    type="datetime-local"
                    InputProps={{
                        inputProps: {
                            min: moment().format("YYYY-MM-DD[T]HH:mm")
                        }
                    }}
                    fullWidth
                    onChange={(e) => {
                        setCoupon({
                            ...coupon, redeem_by: Date.parse(e.target.value) / 1000
                        });
                    }}
                />

                <Button
                    variant="contained"
                    type="submit"
                >
                    Save
                </Button>

            </Box>

        </form >
    );
}

export default StripeCouponCreate;