import { TasksState } from "@/types/index";

export const fakeTasks : TasksState = {
    todo: [
      {
        id: "1",
        title: "Plan year-end quarterly meeting",
        description: "Create a detailed plan for the year-end quarterly meeting to identify important topics, schedule, and prepare presentation materials. Ensure that all team members have been notified correctly and comprehensively.",
        deadline: new Date("2023-12-15"),
        priority: "high",
        status: "todo",
        tags: ["meeting", "planning", "end-of-year"],
        estimatedTime: 8, // Estimated time in hours
        completionPercentage: 20, // Completion percentage
      },
      {
        id: "2",
        title: "Analyze data from the latest customer survey",
        description: "Analyze the results from the recent customer survey to better understand their needs and feedback. Create a report with important insights and propose product improvements based on this analysis.",
        deadline: new Date("2023-11-30"),
        priority: "medium",
        status: "todo",
        tags: ["data analysis", "customer feedback", "product improvement"],
        estimatedTime: 12, // Estimated time in hours
        completionPercentage: 10, // Completion percentage
      },
      {
        id: "3",
        title: "Design user interface for the new mobile app",
        description: "Start designing the user interface for the new mobile app by creating wireframes, mockups, and the final design. Ensure that the interface reflects the desired user experience.",
        deadline: new Date("2023-11-15"),
        priority: "high",
        status: "todo",
        tags: ["mobile app", "UI/UX design", "wireframing"],
        estimatedTime: 24, // Estimated time in hours
        completionPercentage: 5, // Completion percentage
      },
    ],
    doing: [
      {
        id: "4",
        title: "Test and fix website issues",
        description: "Test and fix issues with the current website's user interface and functionality. Ensure that the website runs smoothly without errors.",
        deadline: new Date("2023-10-25"),
        priority: "high",
        status: "doing",
        tags: ["web development", "bug fixing", "quality assurance"],
        estimatedTime: 16, // Estimated time in hours
        completionPercentage: 60, // Completion percentage
      },
      {
        id: "5",
        title: "Create training materials for time management workshop",
        description: "Create detailed training materials for a time management workshop for employees. The materials should cover basic time management aspects, effective time management skills, and supporting tools.",
        deadline: new Date("2023-10-30"),
        priority: "medium",
        status: "doing",
        tags: ["training", "time management", "content creation"],
        estimatedTime: 20, // Estimated time in hours
        completionPercentage: 40, // Completion percentage
      },
    ],
    done: [
      {
        id: "6",
        title: "Deploy new application",
        description: "Complete the deployment of the new application and notify users. Ensure that everything runs smoothly, and users have a good experience.",
        deadline: new Date("2023-10-10"),
        priority: "low",
        status: "done",
        tags: ["deployment", "software release", "user notification"],
        estimatedTime: 10, // Estimated time in hours
        completionPercentage: 100, // Completion percentage
      },
      {
        id: "7",
        title: "Create project progress summary report",
        description: "Create a summary report of the project progress for the end-of-term review. The report should include descriptions of achieved goals, completed tasks, and challenges encountered during the project.",
        deadline: new Date("2023-10-08"),
        priority: "medium",
        status: "done",
        tags: ["reporting", "project progress", "project summary"],
        estimatedTime: 14, // Estimated time in hours
        completionPercentage: 100, // Completion percentage
      },
    ],
    overdue: [
      {
        id: "8",
        title: "Evaluate and improve workflow",
        description: "Evaluate the current workflow and propose improvements to optimize performance and enhance work quality. Start by collecting data and analyzing the effectiveness of the current process.",
        deadline: new Date("2023-09-30"),
        priority: "medium",
        status: "overdue",
        tags: ["process improvement", "workflow analysis", "efficiency"],
        estimatedTime: 20, // Estimated time in hours
        completionPercentage: 30, // Completion percentage
      },
      {
        id: "9",
        title: "Research new market opportunities",
        description: "Conduct market research to identify new opportunities and potential markets. This includes analyzing competition, assessing suppliers, and defining marketing strategies.",
        deadline: new Date("2023-09-25"),
        priority: "high",
        status: "overdue",
        tags: ["market research", "competitive analysis", "marketing strategy"],
        estimatedTime: 18, // Estimated time in hours
        completionPercentage: 15, // Completion percentage
      },
      {
        id: "10",
        title: "Build holiday marketing plan",
        description: "Develop a marketing plan for holiday campaigns at the end of the year. This includes identifying marketing channels, creating advertising content, and planning deployment.",
        deadline: new Date("2023-09-20"),
        priority: "medium",
        status: "overdue",
        tags: ["marketing", "holiday campaign", "marketing plan"],
        estimatedTime: 12, // Estimated time in hours
        completionPercentage: 5, // Completion percentage
      },
    ],
  };
  