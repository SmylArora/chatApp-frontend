import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL= "http://localhost:8090";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggedIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  socket:null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: response?.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in CheckAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
    connectSocket:()=>{
    const {authUser} = get();
    if(!authUser|| get().socket?.conected) return;
    const socket = io(BASE_URL, {
      query:{
        userId:authUser._id,
      }
    });
    socket.connect();
    set({socket:socket});
    socket.on("getOnlineUsers" ,(userIds)=>{
      set({onlineUsers:userIds});
    });

  },
  disconnectSocket:()=>{
    if(get().socket?.connected){
      get().socket.disconnect();
    }
    
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response?.data });
      toast.success("Account created sucessfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
  login: async (data) => {
    set({ isLoggedIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response?.data });
      toast.success("Logged in Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoggedIn: false });
    }
  },
  updateProfile:async(data)=>{
    set({isUpdatingProfile:true});
    try {
        const response = await axiosInstance.put("/auth/update-profile", data);
        set({authUser:response?.data});
        toast.success("Profile updated successfully");

    } catch (error) {
        console.log(error, "Error in updating Profile");
        toast.error(error?.response?.data?.message);
        
    }finally{
        set({isUpdatingProfile:false})
    }
  },
  

}));
