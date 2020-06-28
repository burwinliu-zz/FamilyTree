import React from "react";
import 'styles/view.css'
import {ReconstructUser} from "services/serviceReconstruct";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function ViewUser(props)  {
    //Setting up hooks
    const [isLoading, setIsLoading] = React.useState(true);
    const [userData, setUserData] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await ReconstructUser(props.location.query.id_num);
            console.log(data)
            setUserData(data);
            setIsLoading(false);
        }
        if(props.location && props.location.query && props.location.query.id_num){
            fetchData()
        }
    }, []);
    // Error handling, catching a problem before it becomes an issue
    if (!props.location || !props.location.query || !props.location.query.person_name || !props.location.query.id_num){
        return (
            <div className="view">
                <p> Improper access of this page, please navigate back</p>
            </div>
        );
    }



    if (isLoading){
        return (
            <div className="view">
                <p> testing view User {props.location.query.person_name}</p>
            </div>
        );
    }
    else{
        return (
            <div className="view">
                <p> Done</p>
                <p> testing view User {props.location.query.person_name}</p>
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
            </div>
        );
    }

}

export default ViewUser;