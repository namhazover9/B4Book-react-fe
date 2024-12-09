// vite.config.js
import react from "file:///D:/OJT/B4Book-react-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///D:/OJT/B4Book-react-fe/node_modules/vite-plugin-svgr/dist/index.js";
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
      target: "http://localhost:8000",
      changeOrigin: true
    }
  }
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxPSlRcXFxcQjRCb29rLXJlYWN0LWZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxPSlRcXFxcQjRCb29rLXJlYWN0LWZlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9PSlQvQjRCb29rLXJlYWN0LWZlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHN2Z3IoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiAnL3NyYycgfSxcclxuICAgICAgeyBmaW5kOiAnQHJvdXRlcycsIHJlcGxhY2VtZW50OiAnL3NyYy9yb3V0ZXMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bjb21wb25lbnRzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2NvbXBvbmVudHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bjb21tb24nLCByZXBsYWNlbWVudDogJy9zcmMvY29tcG9uZW50cy9jb21tb24nIH0sXHJcbiAgICAgIHsgZmluZDogJ0BwYWdlcycsIHJlcGxhY2VtZW50OiAnL3NyYy9wYWdlcycgfSxcclxuICAgICAgeyBmaW5kOiAnQGxheW91dHMnLCByZXBsYWNlbWVudDogJy9zcmMvbGF5b3V0cycgfSxcclxuICAgICAgeyBmaW5kOiAnQGNvbnN0YW50cycsIHJlcGxhY2VtZW50OiAnL3NyYy9jb25zdGFudHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bhc3NldHMnLCByZXBsYWNlbWVudDogJy9zcmMvYXNzZXRzJyB9LFxyXG4gICAgICB7IGZpbmQ6ICdAdXRpbHMnLCByZXBsYWNlbWVudDogJy9zcmMvdXRpbHMnIH0sXHJcbiAgICAgIHsgZmluZDogJ0BzdHlsZXMnLCByZXBsYWNlbWVudDogJy9zcmMvc3R5bGVzJyB9LFxyXG4gICAgICAvLyBBZGQgbW9yZSBhbGlhc2VzIGFzIG5lZWRlZFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHByb3h5OiB7XHJcbiAgICAnLyc6IHtcclxuICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBQLE9BQU8sV0FBVztBQUM1USxPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFBQSxFQUN6QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sS0FBSyxhQUFhLE9BQU87QUFBQSxNQUNqQyxFQUFFLE1BQU0sV0FBVyxhQUFhLGNBQWM7QUFBQSxNQUM5QyxFQUFFLE1BQU0sZUFBZSxhQUFhLGtCQUFrQjtBQUFBLE1BQ3RELEVBQUUsTUFBTSxXQUFXLGFBQWEseUJBQXlCO0FBQUEsTUFDekQsRUFBRSxNQUFNLFVBQVUsYUFBYSxhQUFhO0FBQUEsTUFDNUMsRUFBRSxNQUFNLFlBQVksYUFBYSxlQUFlO0FBQUEsTUFDaEQsRUFBRSxNQUFNLGNBQWMsYUFBYSxpQkFBaUI7QUFBQSxNQUNwRCxFQUFFLE1BQU0sV0FBVyxhQUFhLGNBQWM7QUFBQSxNQUM5QyxFQUFFLE1BQU0sVUFBVSxhQUFhLGFBQWE7QUFBQSxNQUM1QyxFQUFFLE1BQU0sV0FBVyxhQUFhLGNBQWM7QUFBQTtBQUFBLElBRWhEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsY0FBYztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
