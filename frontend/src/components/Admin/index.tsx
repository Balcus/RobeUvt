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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import type { UserModel } from "../../api/models/User/UserModel";
import type { UserCreateModel } from "../../api/models/User/UserCreateModel";
import { UserApiClient } from "../../api/clients/UserApiClient";
import "./Admin.css";
import "../../index.css";

const defaultUserCreateModel: UserCreateModel = {
  mail: "",
  phone: null,
  firstName: "",
  lastName: "",
  gender: null,
  gownSize: null,
  capSize: null,
  address: null,
  country: null,
  city: null,
  studyCycle: null,
  facultyId: 1,
  studyProgram: null,
  promotion: null,
  doubleSpecialization: false,
  doubleCycle: false,
  doubleFaculty: false,
  doubleStudyProgram: false,
  specialNeeds: false,
  mobilityAccess: false,
  extraAssistance: false,
  otherNeeds: null,
};

const columns = [
  { id: "mail", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "gownSize", label: "Gown Size" },
  { id: "capSize", label: "Cap Size" },
  { id: "address", label: "Address" },
  { id: "country", label: "Country" },
  { id: "city", label: "City" },
  { id: "studyCycle", label: "Study Cycle" },
  { id: "studyProgram", label: "Study Program" },
  { id: "promotion", label: "Promotion" },
] as const;

export const Admin: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<UserModel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<UserCreateModel>({
    ...defaultUserCreateModel,
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await UserApiClient.getAllAsync();
      setUsers(result);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: UserModel) => {
    setEditingUser(user.id);
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
    setUsers(users.map((u) => (u.id === editedData.id ? editedData : u)));
    setEditingUser(null);
    setEditedData(null);
    setIsLoading(false);
  };

  const handleChange = (field: keyof UserModel, value: any) => {
    if (editedData) setEditedData({ ...editedData, [field]: value });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewUser({ ...defaultUserCreateModel });
  };

  const handleCreateUser = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.mail) return;
    setIsLoading(true);
    try {
      await UserApiClient.createAsync(newUser);
      await fetchUsers();
      handleCloseDialog();
    } catch (err: any) {
      // TODO: add an error handling for all the fe!
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewUserChange = (field: keyof UserCreateModel, value: any) => {
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
            alignItems: "flex-start",
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
                    style={{ color: "white", minWidth: "120px" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => {
                const isEditing = editingUser === user.id;
                const displayUser = isEditing && editedData ? editedData : user;

                return (
                  <TableRow hover key={user.id}>
                    {columns.map((col) => (
                      <TableCell key={col.id}>
                        {isEditing ? (
                          <TextField
                            value={displayUser[col.id] ?? ""}
                            onChange={(e) =>
                              handleChange(
                                col.id as keyof UserModel,
                                e.target.value
                              )
                            }
                            size="small"
                            fullWidth
                          />
                        ) : (
                          (displayUser as any)[col.id]?.toString() ?? ""
                        )}
                      </TableCell>
                    ))}

                    <TableCell>
                      {isEditing ? (
                        <>
                          <IconButton
                            onClick={handleSave}
                            color="primary"
                            size="small"
                          >
                            <Save />
                          </IconButton>
                          <IconButton onClick={handleCancel} size="small">
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
              label="First Name"
              value={newUser.firstName}
              onChange={(e) => handleNewUserChange("firstName", e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              value={newUser.lastName}
              onChange={(e) => handleNewUserChange("lastName", e.target.value)}
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
            disabled={
              isLoading ||
              !newUser.firstName ||
              !newUser.lastName ||
              !newUser.mail
            }
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
