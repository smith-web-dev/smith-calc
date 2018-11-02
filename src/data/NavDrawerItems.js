export default [
  {
    heading: 'General',
    items: [
      {
        icon: 'fas fa-tape',
        text: 'Roll Length',
        path: '/roll-length',
        display: true
      },
      {
        icon: 'fas fa-th-large',
        text: 'Square Footage',
        path: '/sqft',
        display: true
      }
    ]
  },
  {
    heading: 'Conveyor Belt',
    items: [
      {
        icon: 'fas fa-weight',
        text: 'Conveyor Belt Weight',
        path: '/cb-weight',
        display: true
      },
      {
        icon: 'fas fa-ruler',
        text: 'Conveyor Length',
        path: '/cb-length',
        display: true
      },
      {
        icon: 'fas fa-arrows-alt',
        text: 'Precleaner Position',
        path: '/preclean-pos',
        display: false
      }
    ]
  },
  {
    heading: 'Hose',
    items: [
      {
        icon: 'fas fa-compress',
        text: 'Crimp Spec',
        path: '/crimp',
        display: true
      }
    ]
  },
  {
    heading: 'Snowplow Blades',
    items: [
      {
        icon: 'fas fa-snowflake',
        text: 'Snowplow Blade Weight',
        path: '/snowplow-weight',
        display: true
      }
    ]
  }
]
