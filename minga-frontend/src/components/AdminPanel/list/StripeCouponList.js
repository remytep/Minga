// in src/Settings.js
import * as React from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Link } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StripeCouponList = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_ENTRYPOINT + "/coupon")
            .then((res) => {
                console.log(res.data)
                if (res.data.lenght === 0) {
                    return setCoupons(null);
                }
                setCoupons(res.data);
            })
    }, [true])
    console.log(state)

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'code', headerName: 'Name' },
        { field: 'percent_off', headerName: 'Percent', valueGetter: (params) => params.row.coupon.percent_off ? params.row.coupon.percent_off + "%" : "null" },
        { field: 'amount_off', headerName: 'Amount', valueGetter: (params) => params.row.coupon.amount_off ? params.row.coupon.amount_off + " " + params.row.coupon.currency.toUpperCase() : "null" },
        { field: 'valid', flex: 1, headerName: 'Valid', valueGetter: (params) => params.row.coupon.valid },
        { field: 'created', flex: 1, type: 'dateTime', headerName: 'Created at', valueGetter: ({ value }) => value && new Date(value * 1000).toLocaleString() },
        { field: 'redeem_by', flex: 1, type: 'dateTime', headerName: 'Expires in', valueGetter: (params) => params.row.coupon.redeem_by ? new Date(params.row.coupon.redeem_by * 1000).toLocaleString() : "null" },
        {
            field: 'actions',
            renderCell: (params) => (
                <>
                    <Link component="button" underline="none" variant="h5"
                        onClick={() => {
                            navigate("/admin/panel/coupon/show/" + params.row.id)
                        }}>
                        <VisibilityIcon />
                    </Link>
                    <Link component="button" underline="none" variant="h6"
                        onClick={() => {
                            navigate("/admin/panel/coupon/edit/" + params.row.id)
                        }}>
                        <EditIcon />
                    </Link>
                </>
            ),
        }
    ];

    if (coupons.length > 0)
        return (
            <>
                {state && <Alert severity="success">The coupon is {state} !</Alert>}

                <div>
                    <Link component="button" underline="none" variant="h6"
                        onClick={() => {
                            navigate("/admin/panel/coupon/create")
                        }}>
                        Create coupon
                    </Link>
                </div>

                <div className="mt-5 h-4/6">
                    <DataGrid
                        columns={columns}
                        rows={coupons}
                        rowsPerPageOptions={[25, 50, 100]}
                        autoHeight
                        checkboxSelection
                    />
                </div>
            </>
        );
    else if (coupons.length === 0)
        return (
            <p>Loading</p>
        )
    else
        return (
            <p>No coupons found</p>
        )
}

export default StripeCouponList;