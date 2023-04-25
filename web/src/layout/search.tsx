import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import SearchResult from "./searchResult";

import { useDataProvider } from "react-admin";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: 55,
  right: 0,
  width: 600,
  height: "auto",
  bgcolor: "background.paper",
  alignSelf: "flex-start",
  p: 2,
};

export default function SearchAppBar() {
  const dataProvider = useDataProvider();
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const onKeyDown = (event) => {
    if (event.code === "Enter") {
      dataProvider
        .customMethod(
          "customapis/cmssearch",
          {
            filter: {
              text: value,
              skip: 0,
              limit: rowsPerPage,
            },
          },
          "GET"
        )
        .then((result) => {
          setData(result.data.data);
          setCount(result.data.count);
          setOpen(true);
        })
        .catch((error) => console.error(error));
    }
  };

  const [value, setValue] = React.useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  //page change
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/searchcms",
        {
          filter: {
            text: value,
            skip: page * rowsPerPage,
            limit: rowsPerPage,
          },
        },
        "GET"
      )
      .then((result) => {
        setData(result.data.data);
      })
      .catch((error) => console.error(error));
  }, [page, rowsPerPage]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        p: 0,
        m: 0,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
      </Search>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            sx={{ ml: "auto", float: "right", p: 0 }}
            onClick={handleClose}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="subtitle2"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            {count} results
          </Typography>

          <SearchResult
            count={count}
            rows={data}
            rowClick={handleClose}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Modal>
    </Box>
  );
}
