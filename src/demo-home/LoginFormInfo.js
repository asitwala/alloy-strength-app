export default [
  {
    title: 'STEP 1: USER INFORMATION',
    fields: [
      {
        text: 'First Name',
        type: 'input'
      },
      {
        text: 'Last Name',
        type: 'input'
      },
      {
        text: 'Date of Birth',
        type: 'input'
      },
      {
        text: 'Email',
        type: 'input'
      },
      {
        text: 'Password',
        type: 'input'
      },
      {
        text: 'Confirm Password',
        type: 'input'
      }
    ]
  },
  {
    title: 'STEP 2: PHYSICAL STATS',
    fields: [
      {
        text: 'Select Measurement System',
        type: 'select',
        options: [
          {
            value: 'Metric System'
          },
          {
            value: 'Imperial System (United States)'
          }
        ]
      },
      {
        text: 'Height',
        type: 'section',
        fieldsType1: [ // Metric
          {
            text: 'Feet',
            type: 'input'
          },
          {
            text: 'Inches',
            type: 'input'
          }
        ],
        fieldsType2: [ // Imperial
          {
            text: 'Meters',
            type: 'input'
          },
          {
            text: 'Centimeters',
            type: 'input'
          }
        ]
      },
      {
        text: 'Weight',
        type: 'section',
        fieldsType1: [ // Metric
          {
            text: 'Pounds',
            type: 'input'
          }
        ],
        fieldsType2: [ // Imperial
          {
            text: 'Kilograms',
            type: 'input'
          }
        ]
      },
      {
        text: 'Known Max Lifts (Leave Blank if Unknown)',
        type: 'title'
      },
      {
        text: 'Squat',
        type: 'input'
      },
      {
        text: 'Bench',
        type: 'input'
      },
      {
        text: 'Deadlift',
        type: 'input'
      },
      {
        text: 'Overhead Press',
        type: 'input'
      },
      {
        text: 'Power Clean',
        type: 'input'
      },
      {
        text: 'Clean and Jerk',
        type: 'input'
      },
      {
        text: 'Snatch',
        type: 'input'
      },
      {
        text: 'Clean and Jerk',
        type: 'textarea'
      }
    ]
  },
  {
    title: 'STEP 3: EXPERIENCE',
    fields: [
      {
        text: 'Years',
        type: 'input'
      },
      {
        text: 'Months',
        type: 'input'
      },
      {
        text: 'Primary Sports (Leave Blank If None)',
        type: 'textarea'
      },
      {
        text: 'Do You Have Prior RPE Experience?',
        type: 'checkbox'
      }
    ]
  }
]


