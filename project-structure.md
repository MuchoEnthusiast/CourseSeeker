src/
├── app/                              # App Router directory
│   ├── (auth)/                       # Authentication routes
│   │   ├── login/                    # Login page
│   │   ├── register/                 # Registration page
│   │   └── layout.js                 # Auth layout
│   ├── courses/                      # Course-related routes
│   │   ├── [courseId]/               # Dynamic course route
│   │   │   ├── page.js               # Course details page
│   │   │   ├── resources/            # Course resources
│   │   │   └── discussions/          # Course discussions
│   │   ├── browse/                   # Browse courses page
│   │   └── create/                   # Create course page
│   ├── dashboard/                    # User dashboard
│   │   ├── student/                  # Student dashboard
│   │   └── teacher/                  # Teacher dashboard
│   ├── api/                          # API routes
│   │   ├── auth/                     # Auth API endpoints
│   │   ├── courses/                  # Course API endpoints
│   │   ├── resources/                # Resource API endpoints
│   │   └── discussions/              # Discussion API endpoints
│   ├── components/                   # Shared components
│   │   ├── ui/                       # UI components
│   │   ├── layout/                   # Layout components
│   │   └── forms/                    # Form components
│   ├── lib/                          # Utility functions
│   │   ├── auth.js                   # Auth utilities
│   │   └── db.js                     # Database utilities
│   ├── models/                       # Data models
│   ├── globals.css                   # Global styles
│   ├── layout.js                     # Root layout
│   └── page.js                       # Home page
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── next.config.mjs                   # Next.js configuration
└── package.json                      # Project dependencies