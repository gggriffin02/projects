# Calculate percent changes
FinalData <- FinalData %>%
  mutate(
    `Percent Change Total transactions mining` = ( `Total transactions mining` - lag(`Total transactions mining`, 1)) / abs(lag(`Total transactions mining`, 1)) * 100,
    `Percent Change US-China Risk` = ( `US-China Risk` - lag(`US-China Risk`, 1)) / abs(lag(`US-China Risk`, 1)) * 100,
    `Percent Change Lithium Price` = ( `Lithium Price` - lag(`Lithium Price`, 1)) / abs(lag(`Lithium Price`, 1)) * 100,
    `Percent Change EV Sales` = ( `EV Sales` - lag(`EV Sales`, 1)) / abs(lag(`EV Sales`, 1)) * 100,
    `Percent Change Total Transactions` = ( `Total Transactions` - lag(`Total Transactions`, 1)) / abs(lag(`Total Transactions`, 1)) * 100
  )

# Run the regression using percent changes
model_percent_change <- lm(`Percent Change Total transactions mining` ~ `Percent Change US-China Risk` + `Percent Change Lithium Price` + `Percent Change EV Sales` + `Percent Change Total Transactions`, data = FinalData)

# Display the summary of the model
summary(model_percent_change)



# Load necessary libraries
library(dplyr)
library(stats)

# Calculate percent changes and create lagged variables
FinalData <- FinalData %>%
  mutate(
    `Percent Change Total transactions mining` = ( `Total transactions mining` - lag(`Total transactions mining`, 1)) / abs(lag(`Total transactions mining`, 1)) * 100,
    `Percent Change US-China Risk` = ( `US-China Risk` - lag(`US-China Risk`, 1)) / abs(lag(`US-China Risk`, 1)) * 100,
    `Percent Change Lithium Price` = ( `Lithium Price` - lag(`Lithium Price`, 1)) / abs(lag(`Lithium Price`, 1)) * 100,
    `Percent Change EV Sales` = ( `EV Sales` - lag(`EV Sales`, 1)) / abs(lag(`EV Sales`, 1)) * 100,
    `Percent Change Total Transactions` = ( `Total Transactions` - lag(`Total Transactions`, 1)) / abs(lag(`Total Transactions`, 1)) * 100
  ) %>%
  mutate(
    # Create lagged variables for the percent changes
    `Percent Change US-China Risk Lag2` = lag(`Percent Change US-China Risk`, 1),
    `Percent Change Lithium Price Lag2` = lag(`Percent Change Lithium Price`, 1),
    `Percent Change EV Sales Lag2` = lag(`Percent Change EV Sales`, 1),
    `Percent Change Total Transactions Lag2` = lag(`Percent Change Total Transactions`, 1)
  )

# Run the regression using the lagged percent change variables
model_percent_change_lagged <- lm(`Percent Change Total transactions mining` ~ `Percent Change US-China Risk Lag2` + `Percent Change Lithium Price Lag2` + `Percent Change EV Sales Lag2` + `Percent Change Total Transactions Lag2`, data = FinalData)

# Display the summary of the lagged percent change model
summary(model_percent_change_lagged)


# Load necessary libraries
library(dplyr)
library(stats)

# Calculate percent changes for each variable
FinalData <- FinalData %>%
  mutate(
    `Percent Change Total Capital Participation Mining` = ( `Total Capital Participation Mining` - lag(`Total Capital Participation Mining`, 1)) / abs(lag(`Total Capital Participation Mining`, 1)) * 100,
    `Percent Change US-China Risk` = ( `US-China Risk` - lag(`US-China Risk`, 1)) / abs(lag(`US-China Risk`, 1)) * 100,
    `Percent Change Lithium Price` = ( `Lithium Price` - lag(`Lithium Price`, 1)) / abs(lag(`Lithium Price`, 1)) * 100,
    `Percent Change EV Sales` = ( `EV Sales` - lag(`EV Sales`, 1)) / abs(lag(`EV Sales`, 1)) * 100,
    `Percent Change Total Transactions` = ( `Total Transactions` - lag(`Total Transactions`, 1)) / abs(lag(`Total Transactions`, 1)) * 100
  )

# Run the regression using the percent change variables
model_percent_change <- lm(`Percent Change Total Capital Participation Mining` ~ `Percent Change US-China Risk` + `Percent Change Lithium Price` + `Percent Change EV Sales` + `Percent Change Total Transactions`, data = FinalData)

# Display the summary of the model
summary(model_percent_change)


# Load necessary libraries
library(dplyr)
library(stats)

# Calculate percent changes and create lagged variables
FinalData <- FinalData %>%
  mutate(
    `Percent Change Total Capital Participation Mining` = ( `Total Capital Participation Mining` - lag(`Total Capital Participation Mining`, 1)) / abs(lag(`Total Capital Participation Mining`, 1)) * 100,
    `Percent Change US-China Risk` = ( `US-China Risk` - lag(`US-China Risk`, 1)) / abs(lag(`US-China Risk`, 1)) * 100,
    `Percent Change Lithium Price` = ( `Lithium Price` - lag(`Lithium Price`, 1)) / abs(lag(`Lithium Price`, 1)) * 100,
    `Percent Change EV Sales` = ( `EV Sales` - lag(`EV Sales`, 1)) / abs(lag(`EV Sales`, 1)) * 100,
    `Percent Change Total Transactions` = ( `Total Transactions` - lag(`Total Transactions`, 1)) / abs(lag(`Total Transactions`, 1)) * 100
  ) %>%
  mutate(
    # Create lagged variables for the percent changes
    `Percent Change US-China Risk Lag2` = lag(`Percent Change US-China Risk`, 2),
    `Percent Change Lithium Price Lag2` = lag(`Percent Change Lithium Price`, 2),
    `Percent Change EV Sales Lag2` = lag(`Percent Change EV Sales`, 2),
    `Percent Change Total Transactions Lag2` = lag(`Percent Change Total Transactions`, 2)
  )

# Run the regression using the lagged percent change variables
model_percent_change_lagged <- lm(`Percent Change Total Capital Participation Mining` ~ `Percent Change US-China Risk Lag2` + `Percent Change Lithium Price Lag2` + `Percent Change EV Sales Lag2` + `Percent Change Total Transactions Lag2`, data = FinalData)

# Display the summary of the lagged percent change model
summary(model_percent_change_lagged)


names(FinalData)


