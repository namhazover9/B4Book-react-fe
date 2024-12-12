// vite.config.js
import react from "file:///D:/Learn%20IT/devplus/B4Book-react-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///D:/Learn%20IT/devplus/B4Book-react-fe/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = {
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@components", replacement: "/src/components" },
      { find: "@common", replacement: "/src/components/common" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@constants", replacement: "/src/constants" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@styles", replacement: "/src/styles" }
      // Add more aliases as needed
    ]
  },
  proxy: {
    "/": {
      target: process.env.NODE_ENV,
      changeOrigin: true
    }
  }
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxMZWFybiBJVFxcXFxkZXZwbHVzXFxcXEI0Qm9vay1yZWFjdC1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTGVhcm4gSVRcXFxcZGV2cGx1c1xcXFxCNEJvb2stcmVhY3QtZmVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0xlYXJuJTIwSVQvZGV2cGx1cy9CNEJvb2stcmVhY3QtZmUvdml0ZS5jb25maWcuanNcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHN2Z3IoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiAnL3NyYycgfSxcclxuICAgICAgeyBmaW5kOiAnQHJvdXRlcycsIHJlcGxhY2VtZW50OiAnL3NyYy9yb3V0ZXMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bjb21wb25lbnRzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2NvbXBvbmVudHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bjb21tb24nLCByZXBsYWNlbWVudDogJy9zcmMvY29tcG9uZW50cy9jb21tb24nIH0sXHJcbiAgICAgIHsgZmluZDogJ0BwYWdlcycsIHJlcGxhY2VtZW50OiAnL3NyYy9wYWdlcycgfSxcclxuICAgICAgeyBmaW5kOiAnQGxheW91dHMnLCByZXBsYWNlbWVudDogJy9zcmMvbGF5b3V0cycgfSxcclxuICAgICAgeyBmaW5kOiAnQGNvbnN0YW50cycsIHJlcGxhY2VtZW50OiAnL3NyYy9jb25zdGFudHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bhc3NldHMnLCByZXBsYWNlbWVudDogJy9zcmMvYXNzZXRzJyB9LFxyXG4gICAgICB7IGZpbmQ6ICdAdXRpbHMnLCByZXBsYWNlbWVudDogJy9zcmMvdXRpbHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0BzdHlsZXMnLCByZXBsYWNlbWVudDogJy9zcmMvc3R5bGVzJyB9LFxyXG4gICAgICAvLyBBZGQgbW9yZSBhbGlhc2VzIGFzIG5lZWRlZFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHByb3h5OiB7XHJcbiAgICAnLyc6IHtcclxuICAgICAgdGFyZ2V0OiBwcm9jZXNzLmVudi5OT0RFX0VOVixcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUVqQixJQUFPLHNCQUFRO0FBQUEsRUFDYixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ3pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSxLQUFLLGFBQWEsT0FBTztBQUFBLE1BQ2pDLEVBQUUsTUFBTSxXQUFXLGFBQWEsY0FBYztBQUFBLE1BQzlDLEVBQUUsTUFBTSxlQUFlLGFBQWEsa0JBQWtCO0FBQUEsTUFDdEQsRUFBRSxNQUFNLFdBQVcsYUFBYSx5QkFBeUI7QUFBQSxNQUN6RCxFQUFFLE1BQU0sVUFBVSxhQUFhLGFBQWE7QUFBQSxNQUM1QyxFQUFFLE1BQU0sWUFBWSxhQUFhLGVBQWU7QUFBQSxNQUNoRCxFQUFFLE1BQU0sY0FBYyxhQUFhLGlCQUFpQjtBQUFBLE1BQ3BELEVBQUUsTUFBTSxXQUFXLGFBQWEsY0FBYztBQUFBLE1BQzlDLEVBQUUsTUFBTSxVQUFVLGFBQWEsYUFBYTtBQUFBLE1BQzVDLEVBQUUsTUFBTSxXQUFXLGFBQWEsY0FBYztBQUFBO0FBQUEsSUFFaEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxRQUFRLFFBQVEsSUFBSTtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
