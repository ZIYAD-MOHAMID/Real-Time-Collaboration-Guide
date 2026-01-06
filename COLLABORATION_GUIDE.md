# 🤝 Real-Time Collaboration Guide

## 📋 How to Share Documents & Collaborate

### 1. **Create a Document**
1. Sign in to your account
2. Go to the Dashboard
3. Click **"New Document"** button
4. Choose document type:
   - 📝 **Writing** - For text documents
   - 🎨 **Drawing** - For collaborative canvas
   - 📋 **Planning** - For task management
5. Enter a title and click **"Create Document"**

### 2. **Find Your Room ID**
Every document has a **unique Room ID** displayed in the header:
```
Room ID: doc_abc123def456
```

### 3. **Share with Other Users**

#### Method 1: Using the Share Dialog
1. Open any document you own
2. Click the **Share button** (👤 icon) in the document list
3. In the share dialog:
   - Enter collaborator's email address
   - Choose permission level:
     - 👁 **Viewer** - Can only view
     - ✏️ **Editor** - Can edit and view
     - 👑 **Admin** - Full control
   - Click **"Share"**

#### Method 2: Share Room ID Directly
1. Copy the **Room ID** from the document header
2. Send it to your collaborators
3. They can join by:
   - Going to the shared URL
   - Or entering the Room ID in their app

### 4. **Join a Shared Document**

#### For Collaborators:
1. **Get the Room ID** from the document owner
2. **Sign in** to your account
3. **Navigate to Dashboard**
4. Look for the document in **"Shared with Me"** tab
5. Click on the document to open it

### 5. **Real-Time Collaboration Features**

#### 📝 Writing Documents
- **Live text editing** - See others typing in real-time
- **Conflict-free** - Multiple users can edit simultaneously
- **Auto-save** - Changes are saved automatically

#### 🎨 Drawing Canvas
- **Live drawing** - See strokes from other users instantly
- **Cursor tracking** - See where others are drawing
- **Color-coded users** - Each user has unique color

#### 📋 Planning Boards
- **Real-time tasks** - Tasks update instantly
- **Collaborative editing** - Multiple users can modify tasks
- **Progress tracking** - See task completion in real-time

### 6. **User Presence Indicators**

#### In the Document Header:
- **🟢 Green dot** - Connected to room
- **🔴 Red dot** - Disconnected
- **User avatars** - Shows active collaborators
- **User count** - Number of active users
- **Room ID** - Unique identifier for sharing

#### In the Status Bar:
- **Active users list** - Shows who's currently collaborating
- **Last update time** - When changes were last made
- **User colors** - Each user has their assigned color

### 7. **Permission Levels**

| Permission | Capabilities |
|------------|-------------|
| 👁 Viewer | View only, cannot edit |
| ✏️ Editor | View and edit content |
| 👑 Admin | Full control, can manage sharing |

### 8. **WebSocket Connection**

The app uses WebSocket for real-time updates:
- **Connection URL**: `ws://localhost:3001/room/{documentId}`
- **Automatic reconnection** if connection drops
- **Conflict resolution** using CRDT technology

### 9. **Troubleshooting**

#### Can't create documents?
- Make sure you're **signed in**
- Check **browser console** for errors
- Try **refreshing the page**

#### Sharing not working?
- Verify **email address** is correct
- Check **permission level** is appropriate
- Ensure **user exists** in the system

#### Real-time updates not working?
- Check **WebSocket connection** (green dot in header)
- Try **refreshing the page**
- Check **browser console** for connection errors

### 10. **Best Practices**

#### For Document Owners:
- **Set appropriate permissions** - Give Editor access to collaborators who need to edit
- **Share Room ID** - Easy way to invite multiple people
- **Monitor activity** - Use the status bar to see who's active

#### For Collaborators:
- **Communicate** - Use chat or other communication tools
- **Respect permissions** - Don't edit if you only have Viewer access
- **Save work** - Changes are auto-saved but you can manually save too

---

## 🚀 Quick Start

1. **Sign in** → http://localhost:3001/auth/signin
2. **Create document** → Click "New Document" in Dashboard
3. **Copy Room ID** → From the document header
4. **Share Room ID** → Send to collaborators
5. **Start collaborating** → Real-time editing, drawing, or planning!

**Your collaborative workspace is ready for real-time teamwork! 🎉**
