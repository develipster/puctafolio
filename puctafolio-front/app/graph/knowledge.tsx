export const knowledgeData = {
  "title": "Knowledge Graph",
  "description": "A graph representation of knowledge domains and their interconnections.",
  "nodes": [
    // Central node
    {"id": 1, "label": "Computer Engineering Degree", "size": "xl"},
    
    // Macro-topics (Level 2)
    {"id": 2, "label": "Basic Engineering", "size": "m"},
    {"id": 3, "label": "Introductory Computer Engineering", "size": "ml"},
    {"id": 4, "label": "Core Computer Engineering", "size": "l"},
    {"id": 5, "label": "Theoretical Computer Science", "size": "l"},
    {"id": 6, "label": "Data Science and AI", "size": "l"},
    {"id": 7, "label": "Software Engineering and Development", "size": "l"},
    {"id": 8, "label": "Information Technology and Management", "size": "ml"},

    // Basic Engineering Courses
    {"id": 10, "label": "Calculus I (MAT1610)", "size": "xs"},
    {"id": 11, "label": "Calculus II (MAT1620)", "size": "xs"},
    {"id": 12, "label": "Calculus III (MAT1630)", "size": "xs"},
    {"id": 13, "label": "Linear Algebra (MAT1203)", "size": "xs"},
    {"id": 14, "label": "Differential Equations (MAT1640)", "size": "xs"},
    {"id": 15, "label": "Dynamics (FIS1514)", "size": "xs"},
    {"id": 16, "label": "Thermodynamics (FIS1523)", "size": "xs"},
    {"id": 17, "label": "Electricity and Magnetism (FIS1533)", "size": "xs"},
    {"id": 18, "label": "Fluid Mechanics (ICH1104)", "size": "xs"},
    {"id": 19, "label": "Chemistry (QIM100E)", "size": "xs"},
    {"id": 20, "label": "Cellular Biology (BIO141C)", "size": "xs"},
    {"id": 21, "label": "Economics (ICS1513)", "size": "xs"},
    {"id": 22, "label": "Probability and Statistics (EYP1113)", "size": "s"},
    {"id": 23, "label": "Optimization (ICS1113)", "size": "ms"},
    {"id": 24, "label": "Innovation and Entrepreneurship (ING2030)", "size": "ms"},
    {"id": 25, "label": "Engineering Challenges (ING1004)", "size": "ms"},
    {"id": 26, "label": "Ethics and Professional Practice (FIL188)", "size": "xs"},
    
    // Introductory Computer Engineering Courses
    {"id": 30, "label": "Introduction to Programming (IIC1103)", "size": "s"},
    {"id": 31, "label": "Science and Technology in Digital Age (IIC1005)", "size": "s"},
    {"id": 32, "label": "Discrete Mathematics (IIC1253)", "size": "s"},
    {"id": 33, "label": "Advanced Programming (IIC2233)", "size": "ms"},

    // Core Computer Engineering Courses
    {"id": 40, "label": "Data Structures and Algorithms (IIC2133)", "size": "ms"},
    {"id": 41, "label": "Databases/SQL (IIC2413)", "size": "ms"},
    {"id": 42, "label": "Computer Architecture (IIC2343)", "size": "ms"},
    {"id": 43, "label": "Operating Systems and Networks (IIC2333)", "size": "m"},
    {"id": 44, "label": "Distributed Systems (IIC2523)", "size": "m"},

    // Theoretical Computer Science Courses
    {"id": 50, "label": "Logics for Computer Science (IIC2213)", "size": "ms"},
    {"id": 51, "label": "Theory of Automata and Formal Languages (IIC2223)", "size": "ms"},
    {"id": 52, "label": "Algorithm Analysis and Design (IIC2283)", "size": "ms"},
    {"id": 53, "label": "Cryptography and Computer Security (IIC3243)", "size": "m"},
    {"id": 54, "label": "High Performance Computing (IIC3533)", "size": "m"},

    // Data Science and AI Courses
    {"id": 60, "label": "Artificial Intelligence (IIC2613)", "size": "ms"},
    {"id": 61, "label": "Data Mining (IIC2433)", "size": "ms"},
    {"id": 62, "label": "Statistical Inference (EYP2114)", "size": "ms"},
    {"id": 63, "label": "Information Visualization (IIC2026)", "size": "ms"},
    {"id": 64, "label": "Recommender Systems (IIC3633)", "size": "m"},
    {"id": 65, "label": "Process Mining (IIC3757)", "size": "m"},
    {"id": 66, "label": "Data Science for Health (IIC3800)", "size": "m"},
    {"id": 67, "label": "Advanced Topics in AI (IIC3692)", "size": "m"},

    // Software Engineering and Development Courses
    {"id": 70, "label": "Software Engineering (IIC2143)", "size": "ms"},
    {"id": 71, "label": "Web Applications (IIC2513)", "size": "ms"},
    {"id": 72, "label": "Software Architecture (IIC2173)", "size": "ms"},
    {"id": 73, "label": "Specialty Project/Capstone (IIC2154)", "size": "ml"},
    {"id": 74, "label": "Software Development (IIC3143)", "size": "m"},

    // Information Technology and Management Courses
    {"id": 80, "label": "Information Systems (IIC2713)", "size": "s"},
    {"id": 81, "label": "IT Project Management (IIC3113)", "size": "ms"}
  ],
  "edges": [
    // Macro-topics connected to Computer Engineering Degree
    {"from": 1, "to": 2}, // Basic Engineering
    {"from": 1, "to": 3}, // Introductory Computer Engineering
    {"from": 1, "to": 4}, // Core Computer Engineering
    {"from": 1, "to": 5}, // Theoretical Computer Science
    {"from": 1, "to": 6}, // Data Science and AI
    {"from": 1, "to": 7}, // Software Engineering and Development
    {"from": 1, "to": 8}, // Information Technology and Management
    
    // Basic Engineering courses
    {"from": 2, "to": 10}, {"from": 2, "to": 11}, {"from": 2, "to": 12}, {"from": 2, "to": 13},
    {"from": 2, "to": 14}, {"from": 2, "to": 15}, {"from": 2, "to": 16}, {"from": 2, "to": 17},
    {"from": 2, "to": 18}, {"from": 2, "to": 19}, {"from": 2, "to": 20}, {"from": 2, "to": 21},
    {"from": 2, "to": 22}, {"from": 2, "to": 23}, {"from": 2, "to": 24}, {"from": 2, "to": 25},
    {"from": 2, "to": 26},
    
    // Introductory Computer Engineering courses
    {"from": 3, "to": 30}, {"from": 3, "to": 31}, {"from": 3, "to": 32}, {"from": 3, "to": 33},
    
    // Core Computer Engineering courses
    {"from": 4, "to": 40}, {"from": 4, "to": 41}, {"from": 4, "to": 42}, 
    {"from": 4, "to": 43}, {"from": 4, "to": 44},
    
    // Theoretical Computer Science courses
    {"from": 5, "to": 50}, {"from": 5, "to": 51}, {"from": 5, "to": 52}, {"from": 5, "to": 53}, {"from": 5, "to": 54},
    
    // Data Science and AI courses
    {"from": 6, "to": 60}, {"from": 6, "to": 61}, {"from": 6, "to": 62}, {"from": 6, "to": 63},
    {"from": 6, "to": 64}, {"from": 6, "to": 65}, {"from": 6, "to": 66}, {"from": 6, "to": 67},
    
    // Software Engineering and Development courses
    {"from": 7, "to": 70}, {"from": 7, "to": 71}, {"from": 7, "to": 72}, 
    {"from": 7, "to": 73}, {"from": 7, "to": 74},
    
    // Information Technology and Management courses
    {"from": 8, "to": 80}, {"from": 8, "to": 81}
  ]
}

// Basic Engineering:
// - Calculus I (MAT1610), II (MAT1620), III (MAT1630)
// - Linear Algebra (MAT1203)
// - Differential Equations (MAT1640)
// - Dynamics (FIS1514), Thermodynamics (FIS1523), Electricity and Magnetism (FIS1533), Fluid Mechanics (ICH1104)
// - Chemistry(QIM100E), Celular Biology (BIO141C)
// - Economics(ICS1513), Probability and Statistics (EYP1113), Optimization (ICS1113)
// - Innovation and Entrepreneurship (ING2030), Engineering Challenges (ING1004)
// - Ethics and Professional Practice (FIL188)

// Introductory Computer Engineering:
// - Introduction to Programming (IIC1103)
// - Science and Tecnology in the Digital Age (IIC1005)
// - Discrete Mathematics (IIC1253)
// - Advanced Programming (IIC2233)

// Core Computer Engineering:
// - Data Structures and Algorithms (IIC2133)
// - Databases/SQL (IIC2413)
// - Computer Architecture (IIC2343)
// - Operating Systems and Networks (IIC2333)
// - Distributed Systems (IIC2523)

// Theoretical Computer Science:
// - Logics for Computer Science (IIC2213)
// - Theory of Automata and Formal Languages (IIC2223)
// - Algorithm Analysis and Design (IIC2283)
// - Criptography and Computer Security (IIC3243)
// - High Performance Computing (IIC3533)

// Data Science and AI:
// - Artificial Intelligence (IIC2613)
// - Recommender Systems (IIC3633)
// - Advanced Topics in AI (IIC3692)
// - Statistical Inference (EYP2114)
// - Information Visualization (IIC2026)
// - Data Mining (IIC2433)
// - Process Mining (IIC3757)
// - Data Science for Health (IIC3800)

// Software Engineering and Development:
// - Software Engineering (IIC2143)
// - Web Applications (IIC2513)
// - Software Architecture (IIC2173)
// - Specialty Project/Capstone (IIC2154)
// - Software Development (IIC3143)

// Information Technology and Management:
// - Information Systems (IIC2713)
// - IT Project Management (IIC3113)