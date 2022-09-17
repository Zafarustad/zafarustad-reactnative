import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://upayments-studycase-api.herokuapp.com/api',
  timeout: 5000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphZmFydXN0YWQ1MzBAZ21haWwiLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vWmFmYXJ1c3RhZCIsImlhdCI6MTY2MzMzNjg3MywiZXhwIjoxNjYzNzY4ODczfQ.PM5_JLexvdLCpos1rHoK3bxAhiQ77gW6Se2myXf4WQg',
  },
});
