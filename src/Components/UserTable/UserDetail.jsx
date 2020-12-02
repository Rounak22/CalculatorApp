import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {getUsersShow} from "../../Actions/actions"

const useStyles = makeStyles({
	size: {
		minHeight: 100,
		display: "flex",
	},
	detailHeader: {
		fontFamily: "Roboto",
		fontSize: "18px",
		color: "#222B45",
		letterSpacing: 0,
		fontWeight: 600,
		paddingTop: "1%",
	},
	detail: {
		paddingLeft: "4%",
		borderBottom: "1px solid #E8EBF1",
	},
	
	description: {
		fontFamily: "Roboto",
		fontSize: "12px",
		color: "#8992A3",
		lineHeight: "16px",
		fontWeight: 700,
		paddingTop: "4%",
	},
});

export default function UserDetail() {
	const classes = useStyles();
    const user = useSelector((state) => state.CalculatorReducer.userDetail);
  const userFlag = useSelector((state) => state.CalculatorReducer.userFlag);

    const dispatch = useDispatch();
    const handleOpen = (event) => {
       
        dispatch(
            getUsersShow(false),
            
        );
    
      };

	

	return (
		<div style={userFlag ?{}:{display:'none'}} >
            <IconButton onClick={(event) => handleOpen(event)} aria-label="open">
            <ArrowBackIcon />
          </IconButton>
			<div className={classes.size}>
            
				<div className={classes.detail}>
					<p className={classes.detailHeader}>
						Name
                       <br/> {user.name}
					</p>
					<p>
						Created on{" "}
						
					</p>
                    <p style={{ display: "flex", flexDirection: "column" }}>
								<span className="detailsHeader">EMAIL</span>
								<span className="detailsContent">
									{user.email}
								</span>
							</p>
                            <p style={{ display: "flex", flexDirection: "column" }}>
								<span className="detailsHeader">PHONE</span>
								<span className="detailsContent">
									{user.phone}
								</span>
							</p>
                            <p style={{ display: "flex", flexDirection: "column" }}>
								<span className="detailsHeader">USERNAME</span>
								<span className="detailsContent">
									{user.username}
								</span>
							</p>
				
				</div>
			</div>
		
		</div>
	);
}
