import { useEffect, useState, type FC } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { Role } from "../../api/enums/Role";
import type { UserModel } from "../../api/models/User/UserModel";
import { UserApiClient } from "../../api/clients/UserApiClient";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import type { UserCreateModel } from "../../api/models/User/UserCreateModel";
import "./Admin.css";
import "../../index.css";

const getRoleName = (roleValue: number): string => {
  switch (roleValue) {
    case Role.Student:
      return "Student";
    case Role.Administrator:
      return "Administrator";
    case Role.Owner:
      return "Owner";
    default:
      return "Unknown";
  }
};

interface Column {
  id: "name" | "mail" | "role";
  label: string;
  minWidth?: number;
  align?: "right";
}

export const Admin: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<UserModel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<UserCreateModel>({
    name: "",
    mail: "",
  });

  const columns: readonly Column[] = [
    {
      id: "name",
      label: "Name",
      minWidth: 20,
    },
    {
      id: "mail",
      label: "Email Address",
      minWidth: 25,
    },
    {
      id: "role",
      label: "Role",
      minWidth: 20,
    },
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    const result: UserModel[] = await UserApiClient.getAllAsync();
    setUsers(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: UserModel) => {
    setEditingUser(user.mail);
    setEditedData({ ...user });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditedData(null);
  };

  const handleSave = async () => {
    if (!editedData) return;

    setIsLoading(true);
    await UserApiClient.updateAsync(editedData);
    setUsers(users.map((u) => (u.mail === editedData.mail ? editedData : u)));
    setEditingUser(null);
    setEditedData(null);
    setIsLoading(false);
  };

  const handleChange = (field: keyof UserModel, value: string | number) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewUser({
      name: "",
      mail: "",
    });
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.mail) {
      return;
    }

    setIsLoading(true);
    await UserApiClient.createAsync(newUser);
    await fetchUsers();
    handleCloseDialog();
    setIsLoading(false);
  };

  const handleNewUserChange = (
    field: keyof UserModel,
    value: string | number
  ) => {
    setNewUser({ ...newUser, [field]: value });
  };

  if (isLoading && users.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "felx-start",
            marginBottom: "1.2rem",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleOpenDialog}
          >
            Add User
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead className="table-head">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth + "%", color: "white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell style={{ color: "white", minWidth: "10%" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                const isEditing = editingUser === user.mail;
                const displayUser = isEditing && editedData ? editedData : user;

                return (
                  <TableRow hover key={user.mail}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={displayUser.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        displayUser.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={displayUser.mail}
                          onChange={(e) => handleChange("mail", e.target.value)}
                          size="small"
                          fullWidth
                          type="email"
                        />
                      ) : (
                        displayUser.mail
                      )}
                    </TableCell>
                    <TableCell>{getRoleName(displayUser.role)}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <>
                          <IconButton
                            onClick={handleSave}
                            color="primary"
                            size="small"
                            disabled={isLoading}
                          >
                            <Save />
                          </IconButton>
                          <IconButton
                            onClick={handleCancel}
                            color="default"
                            size="small"
                            disabled={isLoading}
                          >
                            <Cancel />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          onClick={() => handleEdit(user)}
                          color="primary"
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={newUser.name}
              onChange={(e) => handleNewUserChange("name", e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              value={newUser.mail}
              onChange={(e) => handleNewUserChange("mail", e.target.value)}
              fullWidth
              type="email"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            disabled={isLoading || !newUser.name || !newUser.mail}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
