export const data =
{
    "title": "CICD",
    "summary": "CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development.",
    "content": "The main concepts attributed to CI/CD are continuous integration, continuous delivery, and continuous deployment. CI/CD is a solution to the problems integrating new code can cause for development and operations teams (AKA integration hell). Specifically, CI/CD introduces ongoing automation and continuous monitoring throughout the lifecycle of apps, from integration and testing phases to delivery and deployment. Taken together, these connected practices are often referred to as a CI/CD pipeline and are supported by development and operations teams working together in an agile way with either a DevOps or site reliability engineering (SRE) approach.",
    "items": [
        {
            "id": "1",
            "title": "Step 1",
            "summary": "What's the difference between CI and CD (and the other CD)?",
            "content": "The acronym CI/CD has a few different meanings. The CI in CI/CD always refers to continuous integration, which is an automation process for developers. Successful CI means new code changes to an app are regularly built, tested, and merged to a shared repository. It’s a solution to the problem of having too many branches of an app in development at once that might conflict with each other.The CD in CI/CD refers to continuous delivery and/or continuous deployment, which are related concepts that sometimes get used interchangeably. Both are about automating further stages of the pipeline, but they’re sometimes used separately to illustrate just how much automation is happening. Continuous delivery usually means a developer’s changes to an application are automatically bug tested and uploaded to a repository (like GitHub or a container registry), where they can then be deployed to a live production environment by the operations team. It’s an answer to the problem of poor visibility and communication between dev and business teams. To that end, the purpose of continuous delivery is to ensure that it takes minimal effort to deploy new code. Continuous deployment (the other possible CD) can refer to automatically releasing a developer’s changes from the repository to production, where it is usable by customers. It addresses the problem of overloading operations teams with manual processes that slow down app delivery. It builds on the benefits of continuous delivery by automating the next stage in the pipeline.",
        },
        {
            "id": "2",
            "title": "Step 2",
            "summary": "Continuous integration",
            "content": "In modern application development, the goal is to have multiple developers working simultaneously on different features of the same app. However, if an organization is set up to merge all branching source code together on one day (known as “merge day”), the resulting work can be tedious, manual, and time-intensive. That’s because when a developer working in isolation makes a change to an application, there’s a chance it will conflict with different changes being simultaneously made by other developers. This problem can be further compounded if each developer has customized their own local integrated development environment (IDE), rather than the team agreeing on one cloud-based IDE. Continuous integration (CI) helps developers merge their code changes back to a shared branch, or trunk, more frequently—sometimes even daily. Once a developer’s changes to an application are merged, those changes are validated by automatically building the application and running different levels of automated testing, typically unit and integration tests, to ensure the changes haven’t broken the app. This means testing everything from classes and function to the different modules that comprise the entire app. If automated testing discovers a conflict between new and existing code, CI makes it easier to fix those bugs quickly and often.",
        },
        {
            "id": "3",
            "title": "Step 3",
            "summary": "Continuous delivery",
            "content": "Following the automation of builds and unit and integration testing in CI, continuous delivery automates the release of that validated code to a repository. So, in order to have an effective continuous delivery process, it’s important that CI is already built into your development pipeline. The goal of continuous delivery is to have a codebase that is always ready for deployment to a production environment. In continuous delivery, every stage—from the merger of code changes to the delivery of production-ready builds—involves test automation and code release automation. At the end of that process, the operations team is able to deploy an app to production quickly and easily.",
        },
        {
            "id": "4",
            "title": "Step 4",
            "summary": "Continuous deployment",
            "content": "The final stage of a mature CI/CD pipeline is continuous deployment. As an extension of continuous delivery, which automates the release of a production-ready build to a code repository, continuous deployment automates releasing an app to production. Because there is no manual gate at the stage of the pipeline before production, continuous deployment relies heavily on well-designed test automation. In practice, continuous deployment means that a developer’s change to a cloud application could go live within minutes of writing it (assuming it passes automated testing). This makes it much easier to continuously receive and incorporate user feedback. Taken together, all of these connected CI/CD practices make deployment of an application less risky, whereby it’s easier to release changes to apps in small pieces, rather than all at once. There’s also a lot of upfront investment, though, since automated tests will need to be written to accommodate a variety of testing and release stages in the CI/CD pipeline.",
        },
        {
            "id": "5",
            "title": "Step 5",
            "summary": "What are some common CI/CD tools?",
            "content": "CI/CD tools can help a team automate their development, deployment, and testing. Some tools specifically handle the integration (CI) side, some manage development and deployment (CD), while others specialize in continuous testing or related functions. One of the best known open source tools for CI/CD is the automation server Jenkins. Jenkins is designed to handle anything from a simple CI server to a complete CD hub. Tekton Pipelines is a CI/CD framework for Kubernetes platforms that provides a standard cloud-native CI/CD experience with containers. Teams may also want to consider managed CI/CD tools, which are available from a variety of vendors. The major public cloud providers all offer CI/CD solutions, along with GitLab, CircleCI, Travis CI, Atlassian Bamboo, and many others. Additionally, any tool that’s foundational to DevOps is likely to be part of a CI/CD process. Tools for configuration automation (such as Ansible, Chef, and Puppet), container runtimes (such as Docker, rkt, and cri-o), and container orchestration (Kubernetes) aren’t strictly CI/CD tools, but they’ll show up in many CI/CD workflows.",
        },
        {
            "id": "6",
            "title": "Step 6",
            "summary": "What are cloud service providers?",
            "content": "Cloud service providers are companies that establish public clouds, manage private clouds, or offer on-demand cloud computing components (also known as cloud computing services) like Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (PaaS), and Software-as-a-Service(SaaS). Cloud services can reduce business process costs when compared to on-premise IT. These clouds aren’t usually deployed as a standalone infrastructure solution, but rather as part of a hybrid cloud.",
        },
        {
            "id": "7",
            "title": "Step 7",
            "summary": "Why use a cloud provider?",
            "content": "Using a cloud provider is a helpful way to access computing services that you would otherwise have to provide on your own, such as: Infrastructure: The foundation of every computing environment. This infrastructure could include networks, database services, data management, data storage (known in this context as cloud storage), servers (cloud is the basis for serverless computing), and virtualization. Platforms: The tools needed to create and deploy applications. These platforms could include operating systems like Linux®, middleware, and runtime environments. Software: Ready-to-use applications. This software could be custom or standard applications provided by independent service providers.",
        },
        {
            "id": "8",
            "title": "Step 8",
            "summary": "Certified cloud providers",
            "content": "There are a handful of well-known, major public cloud companies—such as Alibaba Cloud, Amazon Web Services (AWS), Google Cloud Platform (GCP), IBM Cloud, Oracle Cloud, and Microsoft Azure—but there are also hundreds of other cloud computing providers all over the world. The Red Hat Certified Cloud and Service Provider program includes hundreds of cloud, system integrator, and managed service providers—along with software developers and hardware manufacturers—you can use to run Red Hat products, host physical and virtual machines, and set up private and public cloud environments.",
        },
        {
            "id": "9",
            "title": "Step 9",
            "summary": "How do I pick a cloud provider?",
            "content": "The best cloud for your enterprise depends on your business needs, the size of your business, your current computing platform and IT infrastructure, and what your goals are for the future—among other things. For example, the first thing you might do is evaluate whether using a particular cloud provider aligns with your enterprise strategy. If it does, the next step is to verify what services you’ll need from your cloud to support this strategy—what cloud technologies will you be able to handle within your enterprise, and which should be delegated to a cloud service provider?  Having infrastructure, platform, or software that are managed for you can free your business to serve your clients, be more efficient in overall operations, and allow more time to look into improving or expanding your development operations (DevOps).",
        },
    ],
}
