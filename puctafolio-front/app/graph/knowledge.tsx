
export const knowledgeData = {
  "title": "Knowledge Graph",
  "description": "A graph representation of knowledge domains and their interconnections.",
  "nodes": [
    // Central node
    {"id": 1, "label": "Computer Engineering Degree", "size": "xl", "type": "central"},

    // Macro-topics (Level 2)
    {"id": 2, "label": "Basic Engineering", "size": "m", "type": "macro"},
    {"id": 3, "label": "Introductory Computer Engineering", "size": "ml", "type": "macro"},
    {"id": 4, "label": "Core Computer Engineering", "size": "l", "type": "macro"},
    {"id": 5, "label": "Theoretical Computer Science", "size": "l", "type": "macro"},
    {"id": 6, "label": "Data Science and AI", "size": "l", "type": "macro"},
    {"id": 7, "label": "Software Engineering and Development", "size": "l", "type": "macro"},
    {"id": 8, "label": "Information Technology and Management", "size": "ml", "type": "macro"},

    // Basic Engineering Courses
    {"id": 10, "label": "Calculus I (MAT1610)", "size": "xs", "type": "course"},
    {"id": 11, "label": "Calculus II (MAT1620)", "size": "xs", "type": "course"},
    {"id": 12, "label": "Calculus III (MAT1630)", "size": "xs", "type": "course"},
    {"id": 13, "label": "Linear Algebra (MAT1203)", "size": "xs", "type": "course"},
    {"id": 14, "label": "Differential Equations (MAT1640)", "size": "xs", "type": "course"},
    {"id": 15, "label": "Dynamics (FIS1514)", "size": "xs", "type": "course"},
    {"id": 16, "label": "Thermodynamics (FIS1523)", "size": "xs", "type": "course"},
    {"id": 17, "label": "Electricity and Magnetism (FIS1533)", "size": "xs", "type": "course"},
    {"id": 18, "label": "Fluid Mechanics (ICH1104)", "size": "xs", "type": "course"},
    {"id": 19, "label": "Chemistry (QIM100E)", "size": "xs", "type": "course"},
    {"id": 20, "label": "Cellular Biology (BIO141C)", "size": "xs", "type": "course"},
    {"id": 21, "label": "Economics (ICS1513)", "size": "xs", "type": "course"},
    {"id": 22, "label": "Probability and Statistics (EYP1113)", "size": "s", "type": "course"},
    {"id": 23, "label": "Optimization (ICS1113)", "size": "ms", "type": "course"},
    {"id": 24, "label": "Innovation and Entrepreneurship (ING2030)", "size": "ms", "type": "course"},
    {"id": 25, "label": "Engineering Challenges (ING1004)", "size": "ms", "type": "course"},
    {"id": 26, "label": "Ethics and Professional Practice (FIL188)", "size": "xs", "type": "course"},

    // Introductory Computer Engineering Courses
    {"id": 30, "label": "Introduction to Programming (IIC1103)", "size": "s", "type": "course"},
    {"id": 31, "label": "Science and Technology in Digital Age (IIC1005)", "size": "s", "type": "course"},
    {"id": 32, "label": "Discrete Mathematics (IIC1253)", "size": "s", "type": "course"},
    {"id": 33, "label": "Advanced Programming (IIC2233)", "size": "ms", "type": "course"},

    // Core Computer Engineering Courses
    {"id": 40, "label": "Data Structures and Algorithms (IIC2133)", "size": "ms", "type": "course"},
    {"id": 41, "label": "Databases/SQL (IIC2413)", "size": "ms", "type": "course"},
    {"id": 42, "label": "Computer Architecture (IIC2343)", "size": "ms", "type": "course"},
    {"id": 43, "label": "Operating Systems and Networks (IIC2333)", "size": "m", "type": "course"},
    {"id": 44, "label": "Distributed Systems (IIC2523)", "size": "m", "type": "course"},

    // Theoretical Computer Science Courses
    {"id": 50, "label": "Logics for Computer Science (IIC2213)", "size": "ms", "type": "course"},
    {"id": 51, "label": "Theory of Automata and Formal Languages (IIC2223)", "size": "ms", "type": "course"},
    {"id": 52, "label": "Algorithm Analysis and Design (IIC2283)", "size": "ms", "type": "course"},
    {"id": 53, "label": "Cryptography and Computer Security (IIC3243)", "size": "m", "type": "course"},
    {"id": 54, "label": "High Performance Computing (IIC3533)", "size": "m", "type": "course"},

    // Data Science and AI Courses
    {"id": 60, "label": "Artificial Intelligence (IIC2613)", "size": "ms", "type": "course"},
    {"id": 61, "label": "Data Mining (IIC2433)", "size": "ms", "type": "course"},
    {"id": 62, "label": "Statistical Inference (EYP2114)", "size": "ms", "type": "course"},
    {"id": 63, "label": "Information Visualization (IIC2026)", "size": "ms", "type": "course"},
    {"id": 64, "label": "Recommender Systems (IIC3633)", "size": "m", "type": "course"},
    {"id": 65, "label": "Process Mining (IIC3757)", "size": "m", "type": "course"},
    {"id": 66, "label": "Data Science for Health (IIC3800)", "size": "m", "type": "course"},
    {"id": 67, "label": "Advanced Topics in AI (IIC3692)", "size": "m", "type": "course"},

    // Software Engineering and Development Courses
    {"id": 70, "label": "Software Engineering (IIC2143)", "size": "ms", "type": "course"},
    {"id": 71, "label": "Web Applications (IIC2513)", "size": "ms", "type": "course"},
    {"id": 72, "label": "Software Architecture (IIC2173)", "size": "ms", "type": "course"},
    {"id": 73, "label": "Specialty Project/Capstone (IIC2154)", "size": "ml", "type": "course"},
    {"id": 74, "label": "Software Development (IIC3143)", "size": "m", "type": "course"},

    // Information Technology and Management Courses
    {"id": 80, "label": "Information Systems (IIC2713)", "size": "s", "type": "course"},
    {"id": 81, "label": "IT Project Management (IIC3113)", "size": "ms", "type": "course"}
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