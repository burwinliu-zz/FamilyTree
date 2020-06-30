import React from "react";
import 'styles/view.css'
import {ReconstructUser} from "services/serviceReconstruct";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";

function ViewUser(props)  {
    //Setting up hooks
    const [isLoading, setIsLoading] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const [snackMsg, setSnackMsg] = React.useState("Test");
    const [open, setOpen] = React.useState(true);
    const [windowDimensions, setWindowDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });


    React.useEffect(() => {
        const fetchData = async () => {
            const data = await ReconstructUser(props.location.query.id_num, props.location.query.person_name);
            setUserData(data['data']);
            setIsLoading(false);
            setSnackMsg(data['msg']);
        }
        if(props.location && props.location.query && props.location.query.id_num && props.location.query.person_name){
            fetchData().then(()=>{})
        }
    }, []);

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Error handling, catching a problem before it becomes an issue
    if (!props.location || !props.location.query || !props.location.query.person_name || !props.location.query.id_num){
        return (
            <div className="view-body" >
                <p> Improper access of this page, please navigate back</p>
            </div>
        );
    }

    const handleClose = () => {
        setOpen(false);
    };



    if (isLoading){
        return (
            <div className="view">
                <LinearProgress />
            </div>
        );
    }
    else{
        return (
            <div className="view-body">
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Attribute Name</TableCell>
                                <TableCell align="left">Attribute</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {userData.map((row) => (
                            <TableRow key={row.key}>
                                <TableCell align="left">{row['name_attr']}</TableCell>
                                <TableCell align="left">{row['attr']}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={snackMsg}>
                </Snackbar>
            </div>
        );
    }

}

export default ViewUser;