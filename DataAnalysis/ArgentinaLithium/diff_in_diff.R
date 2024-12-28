# Load necessary libraries
library(dplyr)
library(ggplot2)
library(tidyr)

# Convert "Date" to a Date object
FinalData$Date <- as.Date(FinalData$Date, format = "%Y-%m-%d")

# Filter the data to include only observations until the end of 2020
FinalData_2020 <- FinalData %>%
  filter(Date <= as.Date("2024-3-31"))

# Set June 2018 as the cutoff
cutoff_date <- as.Date("2020-06-30")

# Normalize both variables to index numbers with the first date equal to 100
FinalData_2020 <- FinalData_2020 %>%
  mutate(
    Mining_Index = (`Total Capital Participation Mining` / `Total Capital Participation Mining`[1]) * 100,
    All_Investments_Index = (`Capital Participation  Control` / `Capital Participation  Control`[1]) * 100,
    Post = ifelse(Date > cutoff_date, 1, 0)
  )


# Reshape the data into long format for the DiD analysis
FinalData_long_2020 <- FinalData_2020 %>%
  select(Date, Post, Mining_Index, All_Investments_Index, `Lithium Price`, `EV Sales`) %>%
  pivot_longer(
    cols = c(Mining_Index, All_Investments_Index),
    names_to = "Group",
    values_to = "IndexValue"
  ) %>%
  mutate(
    Treatment = ifelse(Group == "Mining_Index", 1, 0)
  )

# Run the DiD model with Lithium Price and EV Sales as control variables
did_model_with_controls <- lm(IndexValue ~ Treatment * Post + `Lithium Price` + `EV Sales`, data = FinalData_long_2020)
summary(did_model_with_controls)


#### MAKING A DIFF GRAPH


# Load necessary libraries

# Load necessary libraries
library(dplyr)
library(ggplot2)
library(tidyr)

# Compute the average index values for treated and control groups
average_values <- FinalData_long_2020 %>%
  group_by(Date, Group) %>%
  summarise(Average_IndexValue = mean(IndexValue, na.rm = TRUE), .groups = 'drop') %>%
  pivot_wider(names_from = Group, values_from = Average_IndexValue) %>%
  mutate(
    Difference = Mining_Index - All_Investments_Index,  # Calculate the difference
    # Compute standard errors using a simplified approach for illustrative purposes
    Standard_Error = sqrt(
      (sd(FinalData_long_2020$IndexValue[FinalData_long_2020$Group == "Mining_Index"], na.rm = TRUE) / sqrt(n()))^2 +
        (sd(FinalData_long_2020$IndexValue[FinalData_long_2020$Group == "All_Investments_Index"], na.rm = TRUE) / sqrt(n()))^2
    )
  )

# Check the structure of the differences
head(average_values)


# Create the dot plot with vertical error bars
ggplot(average_values, aes(x = Date, y = Difference)) +
  geom_point(size = 2, color = "blue") +  # Dots for each time period
  geom_errorbar(aes(ymin = Difference - 1.96 * Standard_Error, ymax = Difference + 1.96 * Standard_Error), 
                width = 0.2, color = "black") +  # Vertical error bars
  geom_vline(xintercept = as.Date("2018-06-30"), linetype = "dashed", color = "red") +  # Intervention line
  geom_hline(yintercept = 0, linetype = "solid", color = "gray") +  # Baseline at 0
  labs(
    title = "Difference-in-Differences Analysis",
    x = "Date",
    y = "Difference in Index Values"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  # Rotate x-axis labels for readability





####### Initial Regressions #######

# Normalize each variable to the range [0, 1]
normalize <- function(x) (x - min(x, na.rm = TRUE)) / (max(x, na.rm = TRUE) - min(x, na.rm = TRUE))

Econ_101_FDI_Data$US_China_Risk_Normalized <- normalize(Econ_101_FDI_Data$`US-China Risk`)
Econ_101_FDI_Data$Total_Capital_Participation_Mining_Normalized <- normalize(Econ_101_FDI_Data$`Total Capital Participation Mining`)
Econ_101_FDI_Data$Total_FDI_Debts_Mining_Normalized <- normalize(Econ_101_FDI_Data$`Total FDI Debts Mining`)
Econ_101_FDI_Data$Total_Gross_Passive_investment_Mining_Normalized <- normalize(Econ_101_FDI_Data$`Total Gross Passive investment Mining`)
Econ_101_FDI_Data$Total_Gross_Passive_investment_USA_Normalized <- normalize(Econ_101_FDI_Data$`Total Gross Passive investment USA`)
Econ_101_FDI_Data$Net_Capital_Contributions_Mining_Normalized <- normalize(Econ_101_FDI_Data$`Net capital contributions Mining`)

library(ggplot2)

ggplot(Econ_101_FDI_Data, aes(x = Period)) +
  geom_line(aes(y = US_China_Risk_Normalized, color = "US-China Risk"), size = 1) +
  geom_line(aes(y = Total_Capital_Participation_Mining_Normalized, color = "Total Capital Participation Mining"), size = 1) +
  geom_line(aes(y = Total_FDI_Debts_Mining_Normalized, color = "Total FDI Debts Mining"), size = 1) +
  geom_line(aes(y = Total_Gross_Passive_investment_Mining_Normalized, color = "Total Gross Passive investment Mining"), size = 1) +
  geom_line(aes(y = Total_Gross_Passive_investment_USA_Normalized, color = "Total Gross Passive investment USA"), size = 1) +
  geom_line(aes(y = Net_Capital_Contributions_Mining_Normalized, color = "Net capital contributions Mining"), size = 1) +
  labs(title = "Normalized Trends of US-China Risk and Investment Variables Over Time",
       x = "Period", y = "Normalized Value", color = "Legend") +
  theme_minimal() +
  theme(legend.position = "top")

# Fit the multiple linear regression model
model <- lm(`US-China Risk` ~ `Total Capital Participation Mining` +
              `Total FDI Debts Mining` +
              `Total Gross Passive investment Mining` +
              `Total Capital Participation USA` +
              `Total FDI Debts USA` +
              `Total Gross Passive investment USA` +
              `Total Capital Participation China` +
              `Total FDI Debts China` +
              `Total Gross Passive investment China` +
              `Net capital contributions Mining` +
              `Total transactions mining`,
            data = Econ_101_FDI_Data)

# Summary of the regression model
summary(model)

#Lagged Regression
# Load necessary library
library(dplyr)

# Create a new dataset with lagged variables
Econ_101_FDI_Data_Lagged <- Econ_101_FDI_Data %>%
  mutate(
    `Total Capital Participation Mining Lag` = lag(`Total Capital Participation Mining`, n = 1),
    `Total FDI Debts Mining Lag` = lag(`Total FDI Debts Mining`, n = 1),
    `Total Gross Passive investment Mining Lag` = lag(`Total Gross Passive investment Mining`, n = 1),
    `Total Capital Participation USA Lag` = lag(`Total Capital Participation USA`, n = 1),
    `Total FDI Debts USA Lag` = lag(`Total FDI Debts USA`, n = 1),
    `Total Gross Passive investment USA Lag` = lag(`Total Gross Passive investment USA`, n = 1),
    `Total Capital Participation China Lag` = lag(`Total Capital Participation China`, n = 1),
    `Total FDI Debts China Lag` = lag(`Total FDI Debts China`, n = 1),
    `Total Gross Passive investment China Lag` = lag(`Total Gross Passive investment China`, n = 1),
    `Net capital contributions Mining Lag` = lag(`Net capital contributions Mining`, n = 1),
    `Total transactions mining Lag` = lag(`Total transactions mining`, n = 1)
  )

# Run the regression with lagged independent variables
# Load necessary library
library(dplyr)

# Create a new dataset with lagged variables
Econ_101_FDI_Data_Lagged <- Econ_101_FDI_Data %>%
  mutate(
    `Total Capital Participation Mining Lag` = lag(`Total Capital Participation Mining`, n = 1),
    `Total FDI Debts Mining Lag` = lag(`Total FDI Debts Mining`, n = 1),
    `Total Gross Passive investment Mining Lag` = lag(`Total Gross Passive investment Mining`, n = 1),
    `Total Capital Participation USA Lag` = lag(`Total Capital Participation USA`, n = 1),
    `Total FDI Debts USA Lag` = lag(`Total FDI Debts USA`, n = 1),
    `Total Gross Passive investment USA Lag` = lag(`Total Gross Passive investment USA`, n = 1),
    `Total Capital Participation China Lag` = lag(`Total Capital Participation China`, n = 1),
    `Total FDI Debts China Lag` = lag(`Total FDI Debts China`, n = 1),
    `Total Gross Passive investment China Lag` = lag(`Total Gross Passive investment China`, n = 1),
    `Net capital contributions Mining Lag` = lag(`Net capital contributions Mining`, n = 1),
    `Total transactions mining Lag` = lag(`Total transactions mining`, n = 1)
  )

# Run the regression with lagged independent variables
# Load necessary library
library(dplyr)

library(dplyr)

# Create a new dataset with lagged variables
Econ_101_FDI_Data_Lagged <- Econ_101_FDI_Data %>%
  mutate(
    `Total Capital Participation Mining Lag` = lag(`Total Capital Participation Mining`, n = 2),
    `Total FDI Debts Mining Lag` = lag(`Total FDI Debts Mining`, n = 2),
    `Total Gross Passive investment Mining Lag` = lag(`Total Gross Passive investment Mining`, n = 2),
    `Total Capital Participation USA Lag` = lag(`Total Capital Participation USA`, n = 2),
    `Total FDI Debts USA Lag` = lag(`Total FDI Debts USA`, n = 2),
    `Total Gross Passive investment USA Lag` = lag(`Total Gross Passive investment USA`, n = 2),
    `Total Capital Participation China Lag` = lag(`Total Capital Participation China`, n = 2),
    `Total FDI Debts China Lag` = lag(`Total FDI Debts China`, n = 2),
    `Total Gross Passive investment China Lag` = lag(`Total Gross Passive investment China`, n = 2),
    `Net capital contributions Mining Lag` = lag(`Net capital contributions Mining`, n = 2),
    `Total transactions mining Lag` = lag(`Total transactions mining`, n = 2)
  )

# Run the regression with lagged independent variables
model_lagged <- lm(`US-China Risk` ~ `Total Capital Participation Mining Lag` +
                     `Total FDI Debts Mining Lag` +
                     `Total Gross Passive investment Mining Lag` +
                     `Total Capital Participation USA Lag` +
                     `Total FDI Debts USA Lag` +
                     `Total Gross Passive investment USA Lag` +
                     `Total Capital Participation China Lag` +
                     `Total FDI Debts China Lag` +
                     `Total Gross Passive investment China Lag` +
                     `Net capital contributions Mining Lag` +
                     `Total transactions mining Lag`,
                   data = Econ_101_FDI_Data_Lagged)

# Summary of the lagged regression model
summary(model_lagged)



# 1. Data Summary

# Assuming your dataset is named Econ_101_FDI_Data

# Calculate summary statistics for each variable separately
min_values <- sapply(Econ_101_FDI_Data[-1], function(x) min(x, na.rm = TRUE))
max_values <- sapply(Econ_101_FDI_Data[-1], function(x) max(x, na.rm = TRUE))
median_values <- sapply(Econ_101_FDI_Data[-1], function(x) median(x, na.rm = TRUE))
mean_values <- sapply(Econ_101_FDI_Data[-1], function(x) mean(x, na.rm = TRUE))

# Combine the results into a data frame
summary_statistics <- data.frame(
  Variable = names(Econ_101_FDI_Data)[-1],
  Min = min_values,
  Max = max_values,
  Median = median_values,
  Mean = mean_values
)

# Print the summary statistics table
print(summary_statistics)


# controlling for lithium price
# Assuming your dataset is named Econ_101_FDI_Data

Econ_101_FDI_Data <- Econ_101_FDI_Data %>%
  mutate(`Lagged Total transactions mining` = lag(`Total transactions mining`, n = 2))

# Run the regression with the lagged variable
model_lagged <- lm(`Lagged Total transactions mining` ~ `US-China Risk`, data = Econ_101_FDI_Data)

# Display the summary of the regression model
summary(model_lagged)


#Add in control variables
# Run the regression with 'US-China Risk' and 'Lithium Price' as independent variables
model_lagged <- lm(`Total transactions mining Lag` ~ `US-China Risk` + `Lithium Price' + 'Total Transactions', 
                   data = Econ_101_FDI_Data_Lagged)








