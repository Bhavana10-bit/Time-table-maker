# 📅 Timetable Maker

A beautiful, user-friendly web application for creating and managing timetables. Generate perfect schedules in minutes with customizable days, periods, subjects, and break times.

## ✨ Features

- **Flexible Configuration**
  - Customize number of days (1-7)
  - Set number of periods per day (1-12)
  - Custom day names (comma-separated)

- **Subject Management**
  - Add multiple regular subjects
  - Add optional subjects (automatically scheduled 2 classes per week)
  - Easy subject removal with visual tags

- **Time Slot Management**
  - Set custom start and end times
  - Configure short break (after 2 classes)
  - Configure lunch break (after 4 classes)
  - Automatic time slot generation with break integration

- **Smart Timetable Generation**
  - Automatic subject distribution across the week
  - Prevents consecutive same subjects in a day
  - Balanced scheduling algorithm

- **Export & Print**
  - Export timetable as PDF
  - Print-friendly layout
  - Clean, professional formatting

- **User Experience**
  - Modern, gradient-based UI design
  - Responsive layout (mobile-friendly)
  - Smooth transitions and animations
  - Edit and reset functionality

## 🚀 Getting Started

### Prerequisites

No prerequisites needed! This is a pure HTML/CSS/JavaScript application that runs entirely in your browser.

### Installation

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. That's it! No build process or dependencies required.

## 📖 How to Use

### Step 1: Basic Configuration
1. Enter the number of days (default: 5)
2. Enter the number of periods per day (default: 6)
3. Enter day names separated by commas (default: Monday, Tuesday, Wednesday, Thursday, Friday)

### Step 2: Add Subjects
1. Type a subject name in the input field
2. Click "Add Subject" or press Enter
3. Repeat for all your subjects
4. Remove subjects by clicking the × button on their tags

### Step 3: Add Optional Subjects
1. Type an optional subject name
2. Click "Add Optional Subject" or press Enter
3. Optional subjects are automatically scheduled for 2 classes per week

### Step 4: Set Time Slots with Breaks
1. Set your start time and end time
2. Click "Set Time Slots" to generate time periods
3. Enable/disable short break (after 2 classes) and set its time
4. Enable/disable lunch break (after 4 classes) and set its time
5. Review the generated time slots display

### Step 5: Generate Timetable
1. Click "Generate Timetable" button
2. Your timetable will be displayed in a beautiful table format
3. Use "Edit" to go back and make changes
4. Use "Export as PDF" to save your timetable
5. Use "Print" to print the timetable

## 📁 Project Structure

```
time-table-maker/
│
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Application logic and functionality
└── README.md       # This file
```

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with gradients, flexbox, and responsive design
- **Vanilla JavaScript** - No frameworks or dependencies required

## 🎨 Features in Detail

### Automatic Scheduling Algorithm
- Distributes subjects evenly across all available time slots
- Ensures no subject appears consecutively on the same day
- Handles optional subjects separately (2 classes per week each)
- Randomizes placement for variety

### Break Integration
- Automatically inserts breaks at specified periods
- Visual distinction for break cells in the timetable
- Customizable break times

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile devices
- Adaptive layout that adjusts to screen size
- Touch-friendly interface elements

## 🔧 Customization

You can easily customize the application by modifying:

- **Colors**: Edit the gradient colors in `styles.css` (lines 9, 25, 126, 183, 240)
- **Default Values**: Change default inputs in `index.html` (lines 22, 26, 30, 54, 56, 64, 66, 74, 76)
- **Period Duration**: Modify the `periodDuration` variable in `script.js` (line 161) - currently set to 60 minutes

## 📝 Notes

- The application runs entirely client-side - no data is sent to any server
- All data is stored in browser memory and will be lost on page refresh
- For best results, ensure you have enough subjects to fill all time slots
- The timetable generation uses a random algorithm, so results may vary each time

## 🐛 Troubleshooting

**Issue**: Timetable doesn't generate
- **Solution**: Make sure you've added at least one subject

**Issue**: Time slots not showing correctly
- **Solution**: Click "Set Time Slots" after configuring your start/end times

**Issue**: PDF export not working
- **Solution**: Ensure pop-ups are enabled in your browser

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

If you encounter any issues or have suggestions, please open an issue in the repository.

---

**Enjoy creating your perfect timetable! 🎓**

