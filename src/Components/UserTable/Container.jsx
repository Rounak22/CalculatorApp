import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers,getUserById,getUsersShow,deleteUser} from "../../Actions/actions"
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import UserDetail from "./UserDetail"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    //id,name,phone,username,website,email,company,address,city,zipcode
  { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'username', numeric: false, disablePadding: false, label: 'User Name' },
  { id: 'website', numeric: false, disablePadding: false, label: 'Website' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'zipcode', numeric: false, disablePadding: false, label: 'Zipcode' },

];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
    
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Open</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  heading:{
      fontWeight:400
  }
}));

 function ContainerTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.CalculatorReducer.listUser);
  const userFlag = useSelector((state) => state.CalculatorReducer.userFlag);
  
  useEffect(() => {
      if(rows.length ===0){
        dispatch(
            getUsers()
        );
      }
   
    
}, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpen = (event, id) => {
   
    dispatch(
        getUserById(id)
    );
    dispatch(
        getUsersShow(true),
        
    );

  };
  const handleDelete = (e,id) => {
      dispatch(
        deleteUser(id)
      )
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div  className={classes.root}>
      <Paper style={userFlag ?{display:'none'}:{}} className={classes.paper}>
        <h1 className={classes.heading} >Users</h1>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              
              order={order}
              orderBy={orderBy}
              
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                     
                      role="checkbox"
                      
                      tabIndex={-1}
                      key={row.name}
                      
                    >


                      <TableCell component="th" id={labelId} scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.phone}</TableCell>
                      <TableCell >{row.email}</TableCell>
                      <TableCell >{row.username}</TableCell>
                      <TableCell >{row.website}</TableCell>
                      <TableCell >{row.address}</TableCell>
                      <TableCell >{row.company}</TableCell>
                      <TableCell >{row.city}</TableCell>
                      <TableCell >{row.zipcode}</TableCell>
                      <TableCell  onClick={(event) => handleOpen(event, row.id)} ><IconButton aria-label="open">
            <OpenInNewIcon />
          </IconButton></TableCell>
                      <TableCell  onClick={(event) => handleDelete(event, row.id)} ><IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height:53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <UserDetail   />
    </div>
  );
}

export default ContainerTable;