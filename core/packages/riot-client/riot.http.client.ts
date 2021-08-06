import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RiotHttpClientConfig } from "./types";

export class RiotHttpClient {
  private readonly axiosInstance: AxiosInstance;
  constructor(private readonly config: RiotHttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
    });
  }

  public async verifySession(): Promise<boolean> {
    const response = await this.doRequest({ url: this.config.verificationUrl, method: "GET" });
    return response.status !== 403;
  }

  public get(url: string): Promise<AxiosResponse> {
    return this.doRequest({ url, method: "GET" });
  }

  private doRequest(config: Omit<AxiosRequestConfig, "baseURL">): Promise<AxiosResponse> {
    return this.axiosInstance
      .request({
        headers: {
          "X-Riot-Token": this.config.apiToken,
        },
        ...config,
      })
      .catch(({ response }) => response);
  }
}
