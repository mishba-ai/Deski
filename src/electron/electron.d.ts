// Create a file called electron.d.ts in your project

interface ElectronAPI {
    subscribeStatistics: (callback: (stats: any) => void) => void;
    getStaticData: () => Promise<any>;
  }
  
  declare global {
    interface Window {
      electron: ElectronAPI;
    }
  }
  
  export {};