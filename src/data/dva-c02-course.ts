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
                "Describe architectural patterns (event-driven, microservices, monolithic, choreography, orchestration, fanout)",
                "Know when to use each pattern and trade-offs between them",
                "Services: Amazon EventBridge, Amazon SNS, Amazon SQS, AWS Step Functions, AWS Lambda",
              ],
            },
            {
              id: "1.1.2",
              title: "Stateful vs Stateless Concepts",
              skills: [
                "Describe differences between stateful and stateless concepts",
                "Identify when to use stateless designs (Lambda, containers) vs stateful (EC2 with sticky sessions)",
                "How to externalize state using DynamoDB, ElastiCache, or S3",
              ],
            },
            {
              id: "1.1.3",
              title: "Tightly vs Loosely Coupled Components",
              skills: [
                "Describe differences between tightly coupled and loosely coupled components",
                "Using SQS, SNS, and EventBridge to decouple services",
                "Benefits of loose coupling: independent scaling, fault isolation, independent deployments",
              ],
            },
            {
              id: "1.1.4",
              title: "Synchronous vs Asynchronous Patterns",
              skills: [
                "Describe differences between synchronous and asynchronous patterns",
                "Sync: API Gateway + Lambda, direct SDK calls",
                "Async: SQS queues, SNS topics, EventBridge events, S3 event notifications, Lambda async invocations",
              ],
            },
            {
              id: "1.1.5",
              title: "Fault-Tolerant and Resilient Applications",
              skills: [
                "Create fault-tolerant and resilient applications in a programming language (Java, C#, Python, JavaScript, TypeScript, Go)",
                "Handling retries with exponential backoff and jitter",
                "Designing for failure: multi-AZ, graceful degradation, idempotency",
                "Services: Elastic Load Balancing, Auto Scaling, Route 53 health checks",
              ],
            },
            {
              id: "1.1.6",
              title: "Creating and Maintaining APIs",
              skills: [
                "Create, extend, and maintain APIs (response/request transformations, enforcing validation rules, overriding status codes)",
                "Amazon API Gateway: REST APIs, HTTP APIs, WebSocket APIs",
                "Request/response mapping templates (VTL), models, validators",
                "Stage variables, usage plans, throttling, API keys",
              ],
            },
            {
              id: "1.1.7",
              title: "Unit Testing with AWS SAM",
              skills: [
                "Write and run unit tests in development environments (using AWS SAM)",
                "SAM CLI: sam local invoke, sam local start-api, sam local start-lambda",
                "Testing Lambda functions locally before deployment",
              ],
            },
            {
              id: "1.1.8",
              title: "Messaging Services",
              skills: [
                "Write code to use messaging services",
                "Amazon SQS: standard vs FIFO queues, visibility timeout, dead-letter queues, long polling",
                "Amazon SNS: topics, subscriptions, fan-out pattern, message filtering",
                "Amazon EventBridge: event buses, rules, targets, schema registry",
              ],
            },
            {
              id: "1.1.9",
              title: "AWS APIs and SDKs",
              skills: [
                "Write code that interacts with AWS services by using APIs and AWS SDKs",
                "AWS SDK for JavaScript/Python/Java/Go - client initialization, credential chain",
                "AWS CLI for scripting and automation",
                "Pagination, waiters, error handling in SDK calls",
                "Services: S3, DynamoDB, SQS, SNS, Lambda, and more",
              ],
            },
            {
              id: "1.1.10",
              title: "Streaming Data",
              skills: [
                "Handle streaming data using AWS services",
                "Amazon Kinesis Data Streams: shards, partition keys, consumers, enhanced fan-out",
                "Kinesis Data Firehose: delivery streams, transformations, destinations (S3, OpenSearch)",
                "Lambda integration with Kinesis as event source",
              ],
            },
            {
              id: "1.1.11",
              title: "Amazon Q Developer",
              skills: [
                "Use Amazon Q Developer to assist with development",
                "Code suggestions, code generation, and code transformation",
                "Debugging assistance and security scanning",
                "Integration with IDEs (VS Code, JetBrains)",
              ],
            },
            {
              id: "1.1.12",
              title: "EventBridge for Event-Driven Patterns",
              skills: [
                "Use Amazon EventBridge to implement event-driven patterns",
                "Event buses (default, custom, partner), event rules, targets",
                "Event patterns and content-based filtering",
                "Schema registry and schema discovery",
                "Cross-account and cross-region event delivery",
              ],
            },
            {
              id: "1.1.13",
              title: "Resilient Third-Party Integrations",
              skills: [
                "Implement resilient application code for third-party service integrations (retry logic, circuit breakers, error handling patterns)",
                "Exponential backoff with jitter for retries",
                "Circuit breaker pattern: closed, open, half-open states",
                "Timeout configuration and fallback responses",
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
              title: "Lambda VPC Access",
              skills: [
                "Describe the access of private resources in VPCs from Lambda code",
                "Lambda VPC configuration: subnets, security groups, ENIs",
                "NAT Gateway for internet access from VPC-connected Lambda",
                "VPC endpoints for accessing AWS services without internet",
              ],
            },
            {
              id: "1.2.2",
              title: "Lambda Configuration",
              skills: [
                "Configure Lambda functions by defining environment variables and parameters (memory, concurrency, timeout, runtime, handler, layers, extensions, triggers, destinations)",
                "Memory: 128 MB to 10,240 MB (CPU scales proportionally)",
                "Timeout: max 15 minutes. Concurrency: reserved vs provisioned",
                "Layers: share code/libraries across functions (max 5 layers)",
                "Extensions: monitoring, observability, security tools",
              ],
            },
            {
              id: "1.2.3",
              title: "Lambda Event Lifecycle and Error Handling",
              skills: [
                "Handle the event lifecycle and errors by using code (Lambda Destinations, dead-letter queues)",
                "Sync invocation: errors returned to caller directly",
                "Async invocation: retry twice, then DLQ or Lambda Destination",
                "Lambda Destinations: on success/failure routing to SQS, SNS, Lambda, or EventBridge",
                "Dead-letter queues (SQS or SNS) for failed async invocations",
              ],
            },
            {
              id: "1.2.4",
              title: "Testing Lambda",
              skills: [
                "Write and run test code by using AWS services and tools",
                "AWS SAM CLI for local testing (sam local invoke, sam local start-api)",
                "Console test events, CloudWatch Logs for debugging",
                "Mocking AWS services in unit tests",
              ],
            },
            {
              id: "1.2.5",
              title: "Lambda Service Integrations",
              skills: [
                "Integrate Lambda functions with AWS services",
                "Event source mappings: SQS, Kinesis, DynamoDB Streams",
                "Triggers: API Gateway, S3 events, SNS, EventBridge, CloudWatch Events",
                "Step Functions for orchestrating Lambda workflows",
                "Direct invocation via SDK or CLI",
              ],
            },
            {
              id: "1.2.6",
              title: "Lambda Performance Tuning",
              skills: [
                "Tune Lambda functions for optimal performance",
                "Cold starts: provisioned concurrency, SnapStart (Java), keep-warm strategies",
                "Memory/CPU tuning: more memory = more CPU = potentially faster",
                "Connection reuse: initialize SDK clients outside handler",
                "Minimize deployment package size, use layers for shared dependencies",
              ],
            },
            {
              id: "1.2.7",
              title: "Lambda Data Processing",
              skills: [
                "Use Lambda functions to process and transform data in near real time",
                "Kinesis stream processing with Lambda event source mapping",
                "DynamoDB Streams + Lambda for change data capture",
                "S3 event notifications triggering Lambda for file processing",
                "Batch size, batching window, and error handling for stream processing",
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
              title: "DynamoDB Partition Keys",
              skills: [
                "Describe high-cardinality partition keys for balanced partition access",
                "Choosing partition keys that distribute data evenly (e.g., user_id, not status)",
                "Hot partitions: causes, symptoms, and how to avoid them",
                "Write sharding: adding random suffixes to partition keys",
                "Adaptive capacity and burst capacity",
              ],
            },
            {
              id: "1.3.2",
              title: "Database Consistency Models",
              skills: [
                "Describe database consistency models (strongly consistent, eventually consistent)",
                "DynamoDB: eventually consistent reads (default) vs strongly consistent reads",
                "Strongly consistent reads cost 2x the RCUs",
                "Global secondary indexes only support eventually consistent reads",
                "Use cases for each consistency model",
              ],
            },
            {
              id: "1.3.3",
              title: "Query vs Scan Operations",
              skills: [
                "Describe differences between query and scan operations",
                "Query: uses partition key (required) + optional sort key condition, efficient",
                "Scan: reads entire table, expensive and slow, avoid in production",
                "FilterExpression: applied AFTER read (still consumes RCUs for scanned items)",
                "Parallel scan for large tables when scan is unavoidable",
              ],
            },
            {
              id: "1.3.4",
              title: "DynamoDB Keys and Indexing",
              skills: [
                "Define Amazon DynamoDB keys and indexing",
                "Primary key: partition key only, or partition key + sort key (composite)",
                "Global Secondary Index (GSI): different partition key, eventually consistent, has own throughput",
                "Local Secondary Index (LSI): same partition key, different sort key, must be created at table creation",
                "Projected attributes, sparse indexes, GSI overloading patterns",
              ],
            },
            {
              id: "1.3.5",
              title: "Data Serialization and Persistence",
              skills: [
                "Serialize and deserialize data to provide persistence to a data store",
                "DynamoDB data types: S, N, B, BOOL, NULL, L, M, SS, NS, BS",
                "JSON marshalling/unmarshalling with AWS SDKs",
                "DynamoDB Document Client vs low-level client",
                "S3 for object storage, serialization formats (JSON, Parquet, CSV)",
              ],
            },
            {
              id: "1.3.6",
              title: "Managing Data Stores",
              skills: [
                "Use, manage, and maintain data stores",
                "DynamoDB: on-demand vs provisioned capacity, auto-scaling",
                "Amazon RDS: Multi-AZ, read replicas, connection pooling (RDS Proxy)",
                "Amazon Aurora: serverless, global databases",
                "S3: buckets, objects, versioning, storage classes",
              ],
            },
            {
              id: "1.3.7",
              title: "Data Lifecycles",
              skills: [
                "Manage data lifecycles",
                "S3 lifecycle policies: transition between storage classes, expiration",
                "DynamoDB TTL: auto-delete expired items",
                "Backup strategies: DynamoDB on-demand backup, point-in-time recovery",
                "S3 versioning and MFA delete for data protection",
              ],
            },
            {
              id: "1.3.8",
              title: "Data Caching Services",
              skills: [
                "Use data caching services",
                "Amazon ElastiCache: Redis vs Memcached, use cases for each",
                "DynamoDB Accelerator (DAX): in-memory cache for DynamoDB, microsecond reads",
                "Caching strategies: lazy loading (cache-aside), write-through",
                "Cache invalidation, TTL settings, eviction policies",
              ],
            },
            {
              id: "1.3.9",
              title: "Specialized Data Stores",
              skills: [
                "Use specialized data stores based on access patterns (Amazon OpenSearch Service)",
                "Amazon OpenSearch Service: full-text search, log analytics, dashboards",
                "When to use OpenSearch vs DynamoDB vs RDS",
                "Amazon S3 + Athena for ad-hoc SQL queries on data lakes",
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
          title: "Implement authentication and/or authorization for applications and AWS services",
          lessons: [
            {
              id: "2.1.1",
              title: "Federated Access with Cognito and IAM",
              skills: [
                "Use an identity provider to implement federated access (Amazon Cognito, IAM)",
                "Cognito User Pools: sign-up, sign-in, MFA, hosted UI, user management",
                "Cognito Identity Pools: temporary AWS credentials for authenticated/unauthenticated users",
                "User Pool vs Identity Pool: authentication vs authorization",
                "SAML 2.0 and OIDC federation with IAM",
              ],
            },
            {
              id: "2.1.2",
              title: "Securing Apps with Bearer Tokens",
              skills: [
                "Secure applications by using bearer tokens",
                "JWT tokens: ID token, access token, refresh token from Cognito",
                "Token validation, expiration, and refresh flows",
                "API Gateway authorizers: Cognito authorizer, Lambda authorizer",
                "OAuth 2.0 scopes for fine-grained API access",
              ],
            },
            {
              id: "2.1.3",
              title: "Programmatic Access to AWS",
              skills: [
                "Configure programmatic access to AWS",
                "IAM access keys, temporary credentials via STS",
                "AWS CLI configuration: profiles, environment variables, credential files",
                "SDK credential provider chain: env vars, shared credentials file, IAM role, instance profile",
              ],
            },
            {
              id: "2.1.4",
              title: "Authenticated Calls to AWS Services",
              skills: [
                "Make authenticated calls to AWS services",
                "SigV4 signing for API requests",
                "Using SDK/CLI (handles signing automatically)",
                "IAM roles for EC2 (instance profiles), Lambda execution roles, ECS task roles",
              ],
            },
            {
              id: "2.1.5",
              title: "Assuming IAM Roles",
              skills: [
                "Assume an IAM role",
                "AWS STS AssumeRole, AssumeRoleWithSAML, AssumeRoleWithWebIdentity",
                "Cross-account access using role assumption",
                "Trust policies and permissions policies",
                "Role chaining and session duration limits",
              ],
            },
            {
              id: "2.1.6",
              title: "IAM Permissions",
              skills: [
                "Define permissions for IAM principals",
                "IAM policies: identity-based, resource-based, permissions boundaries, SCPs",
                "Policy evaluation logic: explicit deny > explicit allow > implicit deny",
                "Least privilege principle, wildcards, conditions",
                "IAM policy variables and tags for attribute-based access control (ABAC)",
              ],
            },
            {
              id: "2.1.7",
              title: "Application-Level Authorization",
              skills: [
                "Implement application-level authorization for fine-grained access control",
                "Cognito groups and custom attributes for role-based access",
                "Lambda authorizers for custom auth logic",
                "Resource-based policies (S3 bucket policies, SQS queue policies, Lambda resource policies)",
              ],
            },
            {
              id: "2.1.8",
              title: "Cross-Service Authentication in Microservices",
              skills: [
                "Handle cross-service authentication in microservice architectures",
                "Service-to-service auth: IAM roles, VPC endpoints, API keys",
                "Token propagation between services",
                "AWS App Mesh, API Gateway service integrations",
              ],
            },
          ],
        },
        {
          id: "2.2",
          title: "Implement encryption by using AWS services",
          lessons: [
            {
              id: "2.2.1",
              title: "Encryption at Rest and in Transit",
              skills: [
                "Define encryption at rest and in transit",
                "At rest: S3 SSE (SSE-S3, SSE-KMS, SSE-C), EBS encryption, DynamoDB encryption, RDS encryption",
                "In transit: TLS/SSL, HTTPS endpoints, certificate management",
                "Enforcing encryption: S3 bucket policies requiring encryption headers",
              ],
            },
            {
              id: "2.2.2",
              title: "Certificate Management",
              skills: [
                "Describe certificate management (AWS Private CA)",
                "AWS Certificate Manager (ACM): provision and manage SSL/TLS certificates",
                "AWS Private CA for internal PKI and private certificates",
                "Certificate auto-renewal with ACM for AWS services",
              ],
            },
            {
              id: "2.2.3",
              title: "Client-Side vs Server-Side Encryption",
              skills: [
                "Describe differences between client-side encryption and server-side encryption",
                "Server-side: AWS manages encryption/decryption (SSE-S3, SSE-KMS, SSE-C)",
                "Client-side: application encrypts before sending to AWS, decrypts after retrieval",
                "AWS Encryption SDK for client-side encryption with envelope encryption",
              ],
            },
            {
              id: "2.2.4",
              title: "KMS Encryption Keys",
              skills: [
                "Use encryption keys to encrypt or decrypt data",
                "AWS KMS: CMKs (customer managed keys), AWS managed keys, AWS owned keys",
                "Envelope encryption: data key encrypts data, CMK encrypts data key",
                "KMS API: GenerateDataKey, Encrypt, Decrypt",
                "KMS key policies and grants for access control",
              ],
            },
            {
              id: "2.2.5",
              title: "Certificates and SSH Keys",
              skills: [
                "Generate certificates and SSH keys for development purposes",
                "EC2 key pairs for SSH access",
                "ACM for development and staging certificates",
                "Self-signed certificates for local development",
              ],
            },
            {
              id: "2.2.6",
              title: "Cross-Account Encryption",
              skills: [
                "Use encryption across account boundaries",
                "Sharing KMS keys across accounts via key policies",
                "Cross-account S3 access with SSE-KMS encrypted objects",
                "Granting other accounts access to KMS keys via key policy or IAM policy",
              ],
            },
            {
              id: "2.2.7",
              title: "Key Rotation",
              skills: [
                "Enable and disable key rotation",
                "Automatic key rotation for KMS customer managed keys (every year)",
                "Manual key rotation: create new key, update alias",
                "Imported key material: no automatic rotation, must rotate manually",
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
              title: "Data Classification",
              skills: [
                "Describe data classification (personally identifiable information [PII], protected health information [PHI])",
                "Identifying sensitive data types and compliance requirements",
                "AWS Macie for discovering and protecting sensitive data in S3",
              ],
            },
            {
              id: "2.3.2",
              title: "Encrypting Environment Variables",
              skills: [
                "Encrypt environment variables that contain sensitive data",
                "Lambda environment variable encryption with KMS (encryption helpers)",
                "Elastic Beanstalk environment properties",
                "ECS task definition secrets from Secrets Manager or SSM Parameter Store",
              ],
            },
            {
              id: "2.3.3",
              title: "Secret Management Services",
              skills: [
                "Use secret management services to secure sensitive data",
                "AWS Secrets Manager: automatic rotation, cross-account access, RDS integration",
                "AWS Systems Manager Parameter Store: standard vs advanced, SecureString parameters",
                "Secrets Manager vs Parameter Store: when to use each, cost differences",
              ],
            },
            {
              id: "2.3.4",
              title: "Sanitizing Sensitive Data",
              skills: [
                "Sanitize sensitive data",
                "Removing PII from logs before writing to CloudWatch",
                "Input validation and output encoding to prevent injection",
                "Redacting sensitive fields in API responses",
              ],
            },
            {
              id: "2.3.5",
              title: "Data Masking and Sanitization",
              skills: [
                "Implement application-level data masking and sanitization",
                "Masking patterns: partial masking, tokenization, hashing",
                "CloudWatch Logs data protection policies",
                "Application-layer filtering before returning data to clients",
              ],
            },
            {
              id: "2.3.6",
              title: "Multi-Tenant Data Access Patterns",
              skills: [
                "Implement data access patterns for multi-tenant applications",
                "DynamoDB: tenant isolation using partition key prefix or separate tables",
                "IAM policies with conditions for tenant-scoped access",
                "Cognito custom attributes for tenant identification",
                "Row-level security and attribute-level access control",
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
          title: "Prepare application artifacts to be deployed to AWS",
          lessons: [
            {
              id: "3.1.1",
              title: "Managing Code Dependencies",
              skills: [
                "Manage the dependencies of the code module (environment variables, configuration files, container images) within the package",
                "Lambda deployment packages: zip files vs container images",
                "Docker images for ECS/EKS: Dockerfile, multi-stage builds",
                "Package managers: npm, pip, Maven with CodeArtifact",
              ],
            },
            {
              id: "3.1.2",
              title: "Application Directory Structure",
              skills: [
                "Organize files and a directory structure for application deployment",
                "SAM template structure: template.yaml + source code",
                "Elastic Beanstalk: .ebextensions, Procfile, platform hooks",
                "appspec.yml for CodeDeploy (Lambda, EC2, ECS)",
              ],
            },
            {
              id: "3.1.3",
              title: "Code Repositories for Deployment",
              skills: [
                "Use code repositories in deployment environments",
                "AWS CodeCommit (legacy) and third-party repos (GitHub, Bitbucket)",
                "ECR for container image repositories",
                "CodeArtifact for package repositories (npm, pip, Maven)",
              ],
            },
            {
              id: "3.1.4",
              title: "Application Resource Requirements",
              skills: [
                "Apply application requirements for resources (memory, cores)",
                "Lambda memory configuration (128 MB - 10,240 MB, CPU scales with memory)",
                "ECS task definitions: CPU and memory allocation",
                "Elastic Beanstalk instance types and configuration",
              ],
            },
            {
              id: "3.1.5",
              title: "Environment-Specific Configurations",
              skills: [
                "Prepare application configurations for specific environments (using AWS AppConfig)",
                "AWS AppConfig: feature flags, operational parameters, gradual deployment",
                "SSM Parameter Store for environment-specific config values",
                "Lambda environment variables per alias/version",
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
              title: "Testing Deployed Code",
              skills: [
                "Test deployed code by using AWS services and tools",
                "AWS SAM CLI: sam local invoke, sam local start-api",
                "CloudWatch Logs for runtime debugging",
                "X-Ray for tracing request flows",
              ],
            },
            {
              id: "3.2.2",
              title: "Integration Tests and Mock APIs",
              skills: [
                "Write integration tests and mock APIs for external dependencies",
                "Mocking AWS services in tests (aws-sdk-client-mock, moto)",
                "API Gateway mock integrations for testing without backend",
                "LocalStack or SAM local for integration testing",
              ],
            },
            {
              id: "3.2.3",
              title: "Testing with Development Endpoints",
              skills: [
                "Test applications by using development endpoints (configuring stages in Amazon API Gateway)",
                "API Gateway stages: dev, staging, prod with different backends",
                "Stage variables for dynamic configuration",
                "Canary release deployments on API Gateway stages",
              ],
            },
            {
              id: "3.2.4",
              title: "Deploying Stack Updates",
              skills: [
                "Deploy application stack updates to existing environments (deploying an AWS SAM template to a different staging environment)",
                "SAM deploy with --stack-name and --parameter-overrides",
                "CloudFormation change sets for reviewing changes before deployment",
                "Elastic Beanstalk environment cloning and swapping",
              ],
            },
            {
              id: "3.2.5",
              title: "Testing Event-Driven Applications",
              skills: [
                "Test event-driven applications",
                "Creating test events in Lambda console",
                "SAM local generate-event for sample event payloads",
                "Testing SQS/SNS/EventBridge integrations end-to-end",
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
              title: "Application Test Events",
              skills: [
                "Create application test events (JSON payloads for testing Lambda, API Gateway, AWS SAM resources)",
                "Lambda test event templates (S3, API Gateway, SQS, DynamoDB Streams, etc.)",
                "sam local generate-event for creating test payloads",
                "Shared test events in Lambda console",
              ],
            },
            {
              id: "3.3.2",
              title: "Deploying API Resources",
              skills: [
                "Deploy API resources to various environments",
                "API Gateway deployment to stages",
                "Stage-specific settings and throttling",
                "Custom domain names with Route 53 and ACM",
              ],
            },
            {
              id: "3.3.3",
              title: "Versioned Environments for Testing",
              skills: [
                "Create application environments that use approved versions for integration testing (Lambda aliases, container image tags, AWS Amplify branches, AWS Copilot environments)",
                "Lambda versions and aliases for environment separation",
                "ECR image tagging strategies (latest, commit SHA, semantic versioning)",
                "Amplify branch-based deployments for frontend environments",
              ],
            },
            {
              id: "3.3.4",
              title: "Infrastructure as Code",
              skills: [
                "Implement and deploy infrastructure as code (IaC) templates (AWS SAM templates, AWS CloudFormation templates)",
                "CloudFormation: stacks, templates, parameters, outputs, mappings, conditions",
                "SAM: simplified serverless resource definitions, transform",
                "AWS CDK: define infrastructure in TypeScript, Python, Java, Go",
              ],
            },
            {
              id: "3.3.5",
              title: "Managing Environments per Service",
              skills: [
                "Manage environments in individual AWS services (differentiating between development, test, and production in API Gateway)",
                "API Gateway stages for environment separation",
                "Lambda aliases pointing to different versions per environment",
                "Separate AWS accounts or resource naming conventions for env isolation",
              ],
            },
            {
              id: "3.3.6",
              title: "Amazon Q Developer for Test Generation",
              skills: [
                "Use Amazon Q Developer to generate automated tests",
                "Generating unit tests from existing code",
                "Test coverage analysis and gap identification",
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
              title: "Lambda Deployment Packaging",
              skills: [
                "Describe Lambda deployment packaging options",
                "Zip file deployment: direct upload or S3",
                "Container image deployment: up to 10 GB image size",
                "Lambda layers for shared dependencies",
                "SAM package and deploy workflow",
              ],
            },
            {
              id: "3.4.2",
              title: "API Gateway Stages and Custom Domains",
              skills: [
                "Describe API Gateway stages and custom domains",
                "Stages: deployment snapshots with stage variables",
                "Custom domain names: mapping to stages, base path mappings",
                "Regional vs edge-optimized vs private API endpoints",
              ],
            },
            {
              id: "3.4.3",
              title: "Updating IaC Templates",
              skills: [
                "Update existing IaC templates (AWS SAM templates, CloudFormation templates)",
                "CloudFormation stack updates: direct update vs change sets",
                "Resource replacement vs in-place update behaviors",
                "SAM template updates and drift detection",
              ],
            },
            {
              id: "3.4.4",
              title: "Managing Environments with AWS",
              skills: [
                "Manage application environments by using AWS services",
                "Elastic Beanstalk environments: web server vs worker",
                "ECS services and task definitions per environment",
                "CodePipeline with multiple stages for environment promotion",
              ],
            },
            {
              id: "3.4.5",
              title: "Deployment Strategies in Practice",
              skills: [
                "Deploy an application version by using deployment strategies",
                "All-at-once, rolling, rolling with additional batch, immutable (Elastic Beanstalk)",
                "CodeDeploy: in-place vs blue/green deployments",
                "Lambda traffic shifting: linear, canary, all-at-once",
              ],
            },
            {
              id: "3.4.6",
              title: "Repository-Triggered Deployments",
              skills: [
                "Commit code to a repository to invoke build, test, and deployment actions",
                "CodePipeline source actions: CodeCommit, GitHub, S3",
                "CodeBuild: buildspec.yml, build phases, artifacts",
                "Webhooks and event-based pipeline triggers",
              ],
            },
            {
              id: "3.4.7",
              title: "Orchestrated CI/CD Workflows",
              skills: [
                "Use orchestrated workflows to deploy code to different environments",
                "CodePipeline: source, build, test, deploy stages",
                "Manual approval actions between stages",
                "Cross-account and cross-region deployments",
                "Parallel actions and sequential stages",
              ],
            },
            {
              id: "3.4.8",
              title: "Application Rollbacks",
              skills: [
                "Perform application rollbacks by using existing deployment strategies",
                "CodeDeploy automatic rollback on failure or CloudWatch alarm",
                "Elastic Beanstalk: swap environment URLs, rebuild",
                "Lambda: shift traffic back to previous alias/version",
                "CloudFormation rollback on stack update failure",
              ],
            },
            {
              id: "3.4.9",
              title: "Version and Release Management",
              skills: [
                "Use labels and branches for version and release management",
                "Git branching strategies: feature branches, release branches",
                "Tagging releases for traceability",
                "CodePipeline source branch configuration",
              ],
            },
            {
              id: "3.4.10",
              title: "Dynamic Deployments with Runtime Config",
              skills: [
                "Use existing runtime configurations to create dynamic deployments (using staging variables from API Gateway in Lambda functions)",
                "API Gateway stage variables passed to Lambda via context",
                "Lambda environment variables for per-stage configuration",
                "AppConfig for feature flags and dynamic configuration without redeployment",
              ],
            },
            {
              id: "3.4.11",
              title: "Deployment Strategy Configuration",
              skills: [
                "Configure deployment strategies (blue/green, canary, rolling) for application releases",
                "Blue/green: zero-downtime, instant rollback, Route 53 weighted routing",
                "Canary: small percentage first, then full deployment",
                "Rolling: gradual replacement of instances/tasks",
                "CodeDeploy deployment configurations: traffic shifting settings",
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
          title: "Assist in a root cause analysis",
          lessons: [
            {
              id: "4.1.1",
              title: "Debugging Code Defects",
              skills: [
                "Debug code to identify defects",
                "Reading Lambda CloudWatch logs for error traces",
                "Using X-Ray to identify slow or failing segments",
                "Common errors: timeouts, permissions, out-of-memory",
              ],
            },
            {
              id: "4.1.2",
              title: "Interpreting Metrics, Logs, and Traces",
              skills: [
                "Interpret application metrics, logs, and traces",
                "CloudWatch metrics: Lambda (Duration, Errors, Throttles, ConcurrentExecutions)",
                "API Gateway metrics: 4XXError, 5XXError, Latency, IntegrationLatency",
                "X-Ray traces: service maps, segments, subsegments, annotations, metadata",
              ],
            },
            {
              id: "4.1.3",
              title: "Querying Logs",
              skills: [
                "Query logs to find relevant data",
                "CloudWatch Logs Insights query syntax",
                "Common queries: filtering by error level, latency percentiles, request IDs",
                "Log groups, log streams, and retention settings",
              ],
            },
            {
              id: "4.1.4",
              title: "Custom Metrics",
              skills: [
                "Implement custom metrics (Amazon CloudWatch embedded metric format [EMF])",
                "CloudWatch EMF: emit custom metrics from Lambda via structured JSON logs",
                "PutMetricData API for custom metrics",
                "Metric dimensions, namespaces, units, and statistics",
                "High-resolution metrics (1-second granularity)",
              ],
            },
            {
              id: "4.1.5",
              title: "Application Health Dashboards",
              skills: [
                "Review application health by using dashboards and insights",
                "CloudWatch dashboards: widgets, automatic dashboards, cross-account",
                "CloudWatch Application Insights for automated monitoring",
                "CloudWatch Contributor Insights for top-N analysis",
              ],
            },
            {
              id: "4.1.6",
              title: "Troubleshooting Deployment Failures",
              skills: [
                "Troubleshoot deployment failures by using service output logs",
                "CodeDeploy deployment logs and lifecycle events",
                "CloudFormation stack events and rollback reasons",
                "Elastic Beanstalk enhanced health reporting and logs",
                "CodeBuild build logs in CloudWatch",
              ],
            },
            {
              id: "4.1.7",
              title: "Debugging Service Integrations",
              skills: [
                "Debug service integration issues in applications",
                "API Gateway execution logs and access logs",
                "Lambda permission errors (execution role vs resource policy)",
                "SQS/SNS delivery failures and DLQ inspection",
                "Step Functions execution history and error handling",
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
              title: "Logging vs Monitoring vs Observability",
              skills: [
                "Describe differences between logging, monitoring, and observability",
                "Logging: recording events (CloudWatch Logs)",
                "Monitoring: tracking metrics and alerting (CloudWatch Metrics, Alarms)",
                "Observability: understanding internal state from external outputs (logs + metrics + traces)",
              ],
            },
            {
              id: "4.2.2",
              title: "Effective Logging Strategies",
              skills: [
                "Implement an effective logging strategy to record application behavior and state",
                "Log levels: DEBUG, INFO, WARN, ERROR",
                "Correlation IDs for tracing requests across services",
                "Avoiding sensitive data in logs, log retention policies",
              ],
            },
            {
              id: "4.2.3",
              title: "Emitting Custom Metrics from Code",
              skills: [
                "Implement code that emits custom metrics",
                "CloudWatch PutMetricData API from application code",
                "EMF (Embedded Metric Format) for Lambda: JSON structured logs auto-extracted as metrics",
                "Statsd and CloudWatch agent for EC2/container metrics",
              ],
            },
            {
              id: "4.2.4",
              title: "Tracing Annotations",
              skills: [
                "Add annotations for tracing services",
                "X-Ray annotations: indexed key-value pairs for filtering traces",
                "X-Ray metadata: non-indexed data attached to segments",
                "Custom subsegments for instrumenting specific code blocks",
              ],
            },
            {
              id: "4.2.5",
              title: "Notification Alerts",
              skills: [
                "Implement notification alerts for specific actions (notifications about quota limits or deployment completions)",
                "CloudWatch Alarms: metric alarms, composite alarms, anomaly detection",
                "SNS for alert notifications (email, SMS, Lambda, HTTP endpoints)",
                "EventBridge rules for deployment events from CodePipeline/CodeDeploy",
              ],
            },
            {
              id: "4.2.6",
              title: "Distributed Tracing with X-Ray",
              skills: [
                "Implement tracing by using AWS services and tools",
                "AWS X-Ray: SDK integration, daemon, sampling rules",
                "X-Ray with Lambda: active tracing, environment variable AWS_XRAY_TRACING_NAME",
                "X-Ray with API Gateway, ECS, Elastic Beanstalk",
                "Service maps for visualizing request flows",
              ],
            },
            {
              id: "4.2.7",
              title: "Structured Logging",
              skills: [
                "Implement structured logging for application events and user actions",
                "JSON-formatted log output for machine parsing",
                "Fields: timestamp, level, requestId, userId, action, duration",
                "CloudWatch Logs Insights for querying structured logs",
                "Powertools for AWS Lambda: structured logging library",
              ],
            },
            {
              id: "4.2.8",
              title: "Health Checks and Readiness Probes",
              skills: [
                "Configure application health checks and readiness probes",
                "ECS health checks: container-level and ELB target group health checks",
                "Elastic Beanstalk enhanced health reporting",
                "ALB/NLB health check configuration: path, interval, thresholds",
                "Route 53 health checks for DNS failover",
              ],
            },
          ],
        },
        {
          id: "4.3",
          title: "Optimize applications by using AWS services and features",
          lessons: [
            {
              id: "4.3.1",
              title: "Concurrency Concepts",
              skills: [
                "Define concurrency",
                "Lambda concurrency: unreserved, reserved, provisioned",
                "Throttling behavior when concurrency limit is reached",
                "SQS concurrency: maxConcurrency for Lambda event source mapping",
                "DynamoDB: WCU/RCU capacity and auto-scaling",
              ],
            },
            {
              id: "4.3.2",
              title: "Profiling Application Performance",
              skills: [
                "Profile application performance",
                "AWS X-Ray for latency analysis and bottleneck identification",
                "CloudWatch Lambda Insights for function-level performance",
                "Amazon CodeGuru Profiler for runtime performance analysis",
              ],
            },
            {
              id: "4.3.3",
              title: "Right-Sizing Memory and Compute",
              skills: [
                "Determine minimum memory and compute power for an application",
                "Lambda Power Tuning tool for finding optimal memory",
                "ECS task CPU and memory allocation best practices",
                "Cost vs performance trade-offs when right-sizing",
              ],
            },
            {
              id: "4.3.4",
              title: "Subscription Filter Policies",
              skills: [
                "Use subscription filter policies to optimize messaging",
                "SNS subscription filter policies: attribute-based message filtering",
                "Reducing unnecessary Lambda invocations by filtering at SNS level",
                "SQS message filtering vs application-level filtering",
              ],
            },
            {
              id: "4.3.5",
              title: "Caching with Request Headers",
              skills: [
                "Cache content based on request headers",
                "CloudFront cache behaviors: cache based on headers, query strings, cookies",
                "API Gateway caching: per-stage cache, cache key parameters",
                "Cache invalidation strategies",
              ],
            },
            {
              id: "4.3.6",
              title: "Application-Level Caching",
              skills: [
                "Implement application-level caching to improve performance",
                "ElastiCache Redis/Memcached for session data, computed results",
                "DAX for DynamoDB caching (microsecond latency)",
                "Caching strategies: cache-aside (lazy loading), write-through, write-behind",
                "TTL and cache eviction policies",
              ],
            },
            {
              id: "4.3.7",
              title: "Optimizing Resource Usage",
              skills: [
                "Optimize application resource usage",
                "Lambda: reuse execution context, minimize cold starts, reduce package size",
                "Connection pooling with RDS Proxy",
                "S3 Transfer Acceleration, multipart uploads for large objects",
                "DynamoDB: batch operations (BatchGetItem, BatchWriteItem)",
              ],
            },
            {
              id: "4.3.8",
              title: "Analyzing Performance Issues",
              skills: [
                "Analyze application performance issues",
                "Identifying bottlenecks: CPU, memory, I/O, network",
                "Lambda: duration metrics, memory usage in logs, timeouts",
                "API Gateway: integration latency vs total latency",
              ],
            },
            {
              id: "4.3.9",
              title: "Using Logs for Performance Bottlenecks",
              skills: [
                "Use application logs to identify performance bottlenecks",
                "CloudWatch Logs Insights: percentile queries (p95, p99 latency)",
                "Identifying slow database queries from application logs",
                "X-Ray trace analysis for end-to-end latency breakdown",
                "Setting up CloudWatch alarms on performance metrics",
              ],
            },
          ],
        },
      ],
    },
  ],
};
