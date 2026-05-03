import { CourseTree } from "../types/course";

export const DVA_C02_COURSE: CourseTree = {
  examCode: "DVA-C02",
  domains: [
    {
      id: 1,
      title: "Development with AWS Services",
      weight: 32,
      tasks: [
        {
          id: "1.1",
          title: "Develop code for applications hosted on AWS",
          lessons: [
            {
              id: "1.1.1",
              title: "Architectural Patterns",
              skills: [
                "Event-driven, microservices, monolithic, choreography, orchestration, and fanout patterns",
                "Stateful vs stateless concepts",
                "Tightly coupled vs loosely coupled components",
                "Synchronous vs asynchronous patterns",
              ],
            },
            {
              id: "1.1.2",
              title: "Building Resilient Applications",
              skills: [
                "Fault-tolerant and resilient application design",
                "Retry logic, circuit breakers, and error handling for third-party integrations",
                "Using Amazon EventBridge for event-driven patterns",
              ],
            },
            {
              id: "1.1.3",
              title: "APIs and Messaging",
              skills: [
                "Creating, extending, and maintaining APIs (response/request transformations, validation, status codes)",
                "Writing code to use messaging services (SQS, SNS, EventBridge)",
                "Interacting with AWS services using APIs and SDKs",
                "Handling streaming data with AWS services",
              ],
            },
            {
              id: "1.1.4",
              title: "Development Tools",
              skills: [
                "Writing and running unit tests with AWS SAM",
                "Using Amazon Q Developer for development assistance",
              ],
            },
          ],
        },
        {
          id: "1.2",
          title: "Develop code for AWS Lambda",
          lessons: [
            {
              id: "1.2.1",
              title: "Lambda Configuration",
              skills: [
                "Environment variables, memory, concurrency, timeout, and runtime configuration",
                "Handlers, layers, and extensions",
                "Triggers and destinations",
                "Accessing private VPC resources from Lambda",
              ],
            },
            {
              id: "1.2.2",
              title: "Lambda Event Lifecycle",
              skills: [
                "Event lifecycle and error handling",
                "Lambda Destinations and dead-letter queues",
                "Integrating Lambda with other AWS services",
              ],
            },
            {
              id: "1.2.3",
              title: "Lambda Performance and Data Processing",
              skills: [
                "Tuning Lambda for optimal performance",
                "Processing and transforming data in near real time",
                "Writing and running test code for Lambda",
              ],
            },
          ],
        },
        {
          id: "1.3",
          title: "Use data stores in application development",
          lessons: [
            {
              id: "1.3.1",
              title: "DynamoDB Fundamentals",
              skills: [
                "High-cardinality partition keys for balanced access",
                "Strongly consistent vs eventually consistent reads",
                "Query vs scan operations",
                "Keys, indexes (GSI, LSI), and data modeling",
              ],
            },
            {
              id: "1.3.2",
              title: "Data Management and Caching",
              skills: [
                "Serializing and deserializing data for persistence",
                "Managing data lifecycles",
                "Using data caching services (ElastiCache, DAX)",
                "Specialized data stores based on access patterns (OpenSearch)",
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Security",
      weight: 26,
      tasks: [
        {
          id: "2.1",
          title: "Implement authentication and authorization",
          lessons: [
            {
              id: "2.1.1",
              title: "Identity and Access Management",
              skills: [
                "IAM roles, policies, and principals",
                "Assuming IAM roles and programmatic access",
                "Defining permissions and least privilege",
              ],
            },
            {
              id: "2.1.2",
              title: "Federated Access and Cognito",
              skills: [
                "Using identity providers for federated access (Cognito, IAM)",
                "Securing applications with bearer tokens",
                "Application-level authorization for fine-grained access control",
                "Cross-service authentication in microservice architectures",
              ],
            },
          ],
        },
        {
          id: "2.2",
          title: "Implement encryption using AWS services",
          lessons: [
            {
              id: "2.2.1",
              title: "Encryption Fundamentals",
              skills: [
                "Encryption at rest vs in transit",
                "Client-side vs server-side encryption",
                "Using encryption keys (KMS) to encrypt/decrypt data",
                "Key rotation (enabling and disabling)",
              ],
            },
            {
              id: "2.2.2",
              title: "Certificates and Cross-Account Encryption",
              skills: [
                "Certificate management (AWS Private CA)",
                "Generating certificates and SSH keys for development",
                "Using encryption across account boundaries",
              ],
            },
          ],
        },
        {
          id: "2.3",
          title: "Manage sensitive data in application code",
          lessons: [
            {
              id: "2.3.1",
              title: "Secrets and Sensitive Data",
              skills: [
                "Data classification (PII, PHI)",
                "Encrypting environment variables with sensitive data",
                "Using secret management services (Secrets Manager, Parameter Store)",
                "Sanitizing sensitive data and implementing data masking",
                "Data access patterns for multi-tenant applications",
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Deployment",
      weight: 24,
      tasks: [
        {
          id: "3.1",
          title: "Prepare application artifacts for deployment",
          lessons: [
            {
              id: "3.1.1",
              title: "Application Packaging",
              skills: [
                "Managing code dependencies (env vars, config files, container images)",
                "Organizing files and directory structure for deployment",
                "Using code repositories in deployment environments",
                "Applying resource requirements (memory, cores)",
                "Preparing configurations for specific environments (AWS AppConfig)",
              ],
            },
          ],
        },
        {
          id: "3.2",
          title: "Test applications in development environments",
          lessons: [
            {
              id: "3.2.1",
              title: "Testing Strategies",
              skills: [
                "Testing deployed code with AWS services and tools",
                "Writing integration tests and mocking APIs",
                "Testing with development endpoints (API Gateway stages)",
                "Deploying stack updates to existing environments (SAM)",
                "Testing event-driven applications",
              ],
            },
          ],
        },
        {
          id: "3.3",
          title: "Automate deployment testing",
          lessons: [
            {
              id: "3.3.1",
              title: "Infrastructure as Code",
              skills: [
                "Creating application test events (JSON payloads for Lambda, API Gateway)",
                "Implementing and deploying IaC templates (SAM, CloudFormation)",
                "Managing environments in AWS services (dev, test, prod)",
              ],
            },
            {
              id: "3.3.2",
              title: "Environment and Version Management",
              skills: [
                "Deploying API resources to various environments",
                "Creating environments with approved versions (Lambda aliases, container tags, Amplify branches)",
                "Using Amazon Q Developer to generate automated tests",
              ],
            },
          ],
        },
        {
          id: "3.4",
          title: "Deploy code using AWS CI/CD services",
          lessons: [
            {
              id: "3.4.1",
              title: "CI/CD Fundamentals",
              skills: [
                "Lambda deployment packaging options",
                "API Gateway stages and custom domains",
                "Committing code to invoke build, test, and deployment actions",
                "Using orchestrated workflows for multi-environment deployment",
              ],
            },
            {
              id: "3.4.2",
              title: "Deployment Strategies",
              skills: [
                "Blue/green, canary, and rolling deployments",
                "Application rollbacks using deployment strategies",
                "Labels and branches for version and release management",
                "Dynamic deployments with runtime configurations (staging variables)",
              ],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Troubleshooting and Optimization",
      weight: 18,
      tasks: [
        {
          id: "4.1",
          title: "Assist in root cause analysis",
          lessons: [
            {
              id: "4.1.1",
              title: "Debugging and Log Analysis",
              skills: [
                "Debugging code to identify defects",
                "Interpreting application metrics, logs, and traces",
                "Querying logs to find relevant data",
                "Implementing custom metrics (CloudWatch EMF)",
              ],
            },
            {
              id: "4.1.2",
              title: "Service Troubleshooting",
              skills: [
                "Reviewing application health using dashboards and insights",
                "Troubleshooting deployment failures using service logs",
                "Debugging service integration issues",
              ],
            },
          ],
        },
        {
          id: "4.2",
          title: "Instrument code for observability",
          lessons: [
            {
              id: "4.2.1",
              title: "Logging and Monitoring",
              skills: [
                "Differences between logging, monitoring, and observability",
                "Implementing effective logging strategies",
                "Emitting custom metrics from code",
                "Structured logging for application events",
              ],
            },
            {
              id: "4.2.2",
              title: "Tracing and Alerts",
              skills: [
                "Adding annotations for tracing services (X-Ray)",
                "Implementing tracing with AWS tools",
                "Notification alerts for specific actions (quota limits, deployment completions)",
                "Configuring health checks and readiness probes",
              ],
            },
          ],
        },
        {
          id: "4.3",
          title: "Optimize applications",
          lessons: [
            {
              id: "4.3.1",
              title: "Performance Optimization",
              skills: [
                "Concurrency concepts and configuration",
                "Profiling application performance",
                "Determining minimum memory and compute requirements",
                "Subscription filter policies for messaging optimization",
              ],
            },
            {
              id: "4.3.2",
              title: "Caching and Resource Optimization",
              skills: [
                "Caching content based on request headers",
                "Application-level caching for performance",
                "Optimizing application resource usage",
                "Using application logs to identify bottlenecks",
              ],
            },
          ],
        },
      ],
    },
  ],
};
