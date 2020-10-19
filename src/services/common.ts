import axios, { PostData } from '@/axios';
import API from '@/axios/api';

export function uploadFile(file: any): Promise<PostData> {
  return axios.post(API.UPLOAD_FILE, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
