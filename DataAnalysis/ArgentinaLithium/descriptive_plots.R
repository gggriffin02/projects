# Load necessary library
library(ggplot2)

#### Total Capital Participation Mining and US-China Risk
# Convert Date to Date class if it's not already
FinalData$Date <- as.Date(FinalData$Date)

# Create the dual-axis plot
ggplot(FinalData, aes(x = Date)) +
  geom_line(aes(y = `US-China Risk`, color = "US-China Risk")) +
  geom_line(aes(y = `Total Capital Participation Mining` / 10, color = "Total Capital Participation Mining")) +
  scale_y_continuous(
    name = "US-China Risk",
    sec.axis = sec_axis(~ . * 10, name = "Total Capital Participation Mining (Million USD)")
  ) +
  labs(title = "US-China Risk and Total Capital Participation Mining Over Time",
       x = "Date") +
  scale_color_manual(values = c("US-China Risk" = "blue", 
                                "Total Capital Participation Mining" = "red")) +
  theme_minimal() +
  theme(
    axis.title.y = element_text(color = "blue"),
    axis.title.y.right = element_text(color = "red")
  )



##### USA vs CHINA
# Load necessary library
library(ggplot2)

# Convert Date to Date class if it's not already
FinalData$Date <- as.Date(FinalData$Date)

# Create the line graph
ggplot(FinalData, aes(x = Date)) +
  geom_line(aes(y = `US-China Risk`, color = "US-China Risk")) +
  geom_line(aes(y = `Total Gross Passive investment China`, color = "FDI China")) +
  geom_line(aes(y = `Total Gross Passive investment USA`, color = "FDI USA")) +
  labs(title = "US-China Risk and FDI Investments Over Time",
       x = "Date", y = "Value") +
  scale_color_manual(values = c("US-China Risk" = "blue", 
                                "FDI China" = "red",
                                "FDI USA" = "green")) +
  theme_minimal() +
  theme(
    legend.title = element_blank(),
    axis.title.y = element_text(color = "black")
  )



### Graph with the Controls ###
# Load necessary library
library(ggplot2)

# Convert Date to Date class if it's not already
FinalData$Date <- as.Date(FinalData$Date)

# Create the line graph with scaled values
ggplot(FinalData, aes(x = Date)) +
  geom_line(aes(y = `Lithium Price` / 10000, color = "Lithium Price (10,000 CYN per ton)")) +
  geom_line(aes(y = `EV Sales`, color = "EV Sales (in 100 million vehicles)")) +
  geom_line(aes(y = `Total Capital Participation Mining` / 100, color = "Total Capital Participation Mining (in 100 million USD)")) +
  labs(title = "Lithium Price, EV Sales, and Total Capital Participation Mining Over Time",
       x = "Date", y = "Scaled Value") +
  scale_color_manual(values = c("Lithium Price (10,000 CYN per ton)" = "black", 
                                "EV Sales (in 100 million vehicles)" = "red",
                                "Total Capital Participation Mining (in 100 million USD)" = "blue")) +
  theme_minimal() +
  theme(
    legend.title = element_blank(),
    axis.title.y = element_text(color = "black")
  )



## TOTAL TRANSACTIONS Graph

# Load necessary library
library(ggplot2)

# Convert Date to Date class if it's not already
FinalData$Date <- as.Date(FinalData$Date)

# Calculate changes over time
FinalData$Change_Total_Transactions_Mining <- c(NA, diff(FinalData$`Total transactions mining`))
FinalData$Change_US_China_Risk <- c(NA, diff(FinalData$`US-China Risk`))

# Create the line graph for changes
ggplot(FinalData, aes(x = Date)) +
  geom_line(aes(y = Change_Total_Transactions_Mining, color = "Change in Total Transactions Mining")) +
  geom_line(aes(y = Change_US_China_Risk, color = "Change in US-China Risk")) +
  labs(title = "Change in Total Transactions Mining and US-China Risk Over Time",
       x = "Date", y = "Change Value") +
  scale_color_manual(values = c("Change in Total Transactions Mining" = "darkblue", 
                                "Change in US-China Risk" = "orange")) +
  theme_minimal() +
  theme(
    legend.title = element_blank(),
    axis.title.y = element_text(color = "black")
  )




