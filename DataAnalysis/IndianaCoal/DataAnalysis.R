# clean up the coal data
Indiana_Coal_Data$closed_2016 <- ifelse(is.na(Indiana_Coal_Data$closed_2016), 0, Indiana_Coal_Data$closed_2016)

# Filter out small counties with outlier values
# Using subset function
counties_to_remove <- c("Ripley")

filtered_data <- Indiana_Coal_Data[!(Indiana_Coal_Data$County %in% counties_to_remove), ]
library(dplyr)

# Create a new dataset with treatment groups
treatment <- filtered_data %>% filter(closed_2016 == 1)
control <- filtered_data %>% filter(closed_2016 == 0)

library(ggplot2)

# Assuming the dataset structure: treatment$year, treatment$infant_mortality_rate

# Calculate binned averages for infant_mortality_rate by year
binned_data <- treatment %>%
  group_by(Year) %>%
  summarise(avg_mortality = mean(Infant_mortality_rate, na.rm = TRUE)) %>%
  ungroup()

binned_data_control <- control %>%
  group_by(Year) %>%
  summarise(avg_mortality = mean(Infant_mortality_rate, na.rm = TRUE)) %>%
  ungroup()

# Create a scatterplot
x_limits <- range(c(binned_data$Year, binned_data_control$Year))
y_limits <- range(c(binned_data$avg_mortality, binned_data_control$avg_mortality))

# Plot for treatment group
plot_treatment <- ggplot(binned_data, aes(x = Year, y = avg_mortality)) +
  geom_point() + 
  labs(x = "Year", y = "Binned Average Infant Mortality Rate") +
  ggtitle("Binned Average Infant Mortality Rate per Year") +
  xlim(x_limits) + ylim(y_limits)

# Plot for control group
plot_control <- ggplot(binned_data_control, aes(x = Year, y = avg_mortality)) +
  geom_point() + 
  labs(x = "Year", y = "Binned Average Infant Mortality Rate") +
  ggtitle("Binned Average Infant Mortality Rate per Year in Control") +
  xlim(x_limits) + ylim(y_limits)

# View both plots
plot_treatment
plot_control

#________________________________________________
# Parallel Trends with log and in the same plot 

# Add a column for log infant mortality rate to treatment
treatment <- treatment %>%
  mutate(log_infant_mortality_rate = log(Infant_mortality_rate))

# Add a column for log infant mortality rate to control
control <- control %>%
  mutate(log_infant_mortality_rate = log(Infant_mortality_rate))

# Calculate binned averages for log infant mortality rate by year for treatment
binned_data_treatment <- treatment %>%
  group_by(Year) %>%
  summarise(avg_log_mortality = mean(log_infant_mortality_rate, na.rm = TRUE)) %>%
  ungroup()

# Calculate binned averages for log infant mortality rate by year for control
binned_data_control <- control %>%
  group_by(Year) %>%
  summarise(avg_log_mortality = mean(log_infant_mortality_rate, na.rm = TRUE)) %>%
  ungroup()

# Merge treatment and control data for plotting
combined_data <- bind_rows(
  mutate(binned_data_treatment, Group = "Treatment"),
  mutate(binned_data_control, Group = "Control")
)

# Plot both treatment and control on the same plot
ggplot(combined_data, aes(x = Year, y = avg_log_mortality, color = Group)) +
  geom_point() +
  geom_line() +
  labs(x = "Year", y = "Binned Average Log Infant Mortality Rate") +
  ggtitle("Binned Average Log Infant Mortality Rate per Year") +
  scale_color_manual(values = c("blue", "red")) +
  geom_vline(xintercept = 2016, linetype = "dotted", color = "black")  # Add a dotted vertical line at year 2016
#______________________________________________________

# Table with Stats Summary
library(knitr)
stats_by_year <- Indiana_Coal_Data %>%
  group_by(Year) %>%
  summarise(
    LBW_min = min(`%_LBW`, na.rm = TRUE),
    LBW_max = max(`%_LBW`, na.rm = TRUE),
    LBW_std = sd(`%_LBW`, na.rm = TRUE),
    LBW_size = sum(!is.na(`%_LBW`)),
    Inf_mort_min = min(Infant_mortality_rate, na.rm = TRUE),
    Inf_mort_max = max(Infant_mortality_rate, na.rm = TRUE),
    Inf_mort_std = sd(Infant_mortality_rate, na.rm = TRUE),
    Inf_mort_size = sum(!is.na(Infant_mortality_rate)),
  )

# Print or view the summary statistics
kable(stats_by_year, align = "c")


#_____________________________________
# Finding no effect here
# Calculate binned averages for %_LBW by year
binned_data_percent_lbw <- treatment %>%
  group_by(Year) %>%
  summarise(avg_percent_lbw = mean(`%_LBW`, na.rm = TRUE)) %>%
  ungroup()

binned_data_control_percent_lbw <- control %>%
  group_by(Year) %>%
  summarise(avg_percent_lbw = mean(`%_LBW`, na.rm = TRUE)) %>%
  ungroup()

# Create a scatterplot
x_limits_percent_lbw <- range(c(binned_data_percent_lbw$Year, binned_data_control_percent_lbw$Year))
y_limits_percent_lbw <- range(c(binned_data_percent_lbw$avg_percent_lbw, binned_data_control_percent_lbw$avg_percent_lbw))

# Plot for treatment group - %_LBW
plot_treatment_percent_lbw <- ggplot(binned_data_percent_lbw, aes(x = Year, y = avg_percent_lbw)) +
  geom_point() + 
  labs(x = "Year", y = "Binned Average % LBW Births") +
  ggtitle("Binned Average % LBW Births per Year") +
  xlim(x_limits_percent_lbw) + ylim(y_limits_percent_lbw)

# Plot for control group - %_LBW
plot_control_percent_lbw <- ggplot(binned_data_control_percent_lbw, aes(x = Year, y = avg_percent_lbw)) +
  geom_point() + 
  labs(x = "Year", y = "Binned Average % LBW Births") +
  ggtitle("Binned Average % LBW Births per Year in Control") +
  xlim(x_limits_percent_lbw) + ylim(y_limits_percent_lbw)

# View both plots for %_LBW
plot_treatment_percent_lbw
plot_control_percent_lbw


# _______________________________________
# Running the Regressions 
# Remove rows with NA values in relevant columns
data_clean <- na.omit(Indiana_Coal_Data[c("Infant_mortality_rate", "closed_2016", "Year", "FIPS")])
data_clean$A <- as.integer(data_clean$Year >= 2018)
data_clean$Year <- as.factor(data_clean$Year)
data_clean$FIPS <- as.factor(data_clean$FIPS)
data_clean$log_inf_mort <- log(data_clean$Infant_mortality_rate)


# Load necessary packages
library(fixest)
library(ggiplot)

EventStudy <- feols(data_clean,
                    log_inf_mort ~ i(Year, closed_2016, ref = 2016) |
                      FIPS+Year, cluster = "FIPS")

ggiplot(EventStudy)+ 
  labs(title = 'Effect of plant closing on Infant Mortality Rate ',
       x = 'Year')


# Regression Results
summary(EventStudy)

regression1 <- feols(data_clean, log_inf_mort ~ closed_2016*A + closed_2016 + A, cluster = "FIPS")
summary(regression1)

#____________________________________
# Placebo Test
income_data <- stats_data_624  # Assign stats_data_399 to a new variable named income_data

income_data <- income_data %>%
  rename(income = Data)
income_data$countyfips <- paste0("18", income_data$countyfips)

data_clean$FIPS <- as.double(data_clean$FIPS)
income_data$countyfips <- as.double(income_data$countyfips)

data_clean$Year <- as.double(data_clean$Year)
income_data$year <- as.double(income_data$year)


# Merge the income column from income_data into data_clean based on FIPS and Year
data_clean <- data_clean %>%
  left_join(income_data, by = c("FIPS" = "countyfips", "Year" = "year"))


# Parallel Trends Placebo Test
#________________________________
# Create a new dataset with treatment groups
treatment <- filtered_data %>% filter(closed_2016 == 1)
control <- filtered_data %>% filter(closed_2016 == 0)

library(ggplot2)

# Assuming the dataset structure: treatment$year, treatment$infant_mortality_rate

# Calculate binned averages for infant_mortality_rate by year
binned_data <- treatment %>%
  group_by(Year) %>%
  summarise(avg_mortality = mean(Infant_mortality_rate, na.rm = TRUE)) %>%
  ungroup()

binned_data_control <- control %>%
  group_by(Year) %>%
  summarise(avg_mortality = mean(Infant_mortality_rate, na.rm = TRUE)) %>%
  ungroup()

# Create a scatterplot
x_limits <- range(c(binned_data$Year, binned_data_control$Year))
y_limits <- range(c(binned_data$avg_mortality, binned_data_control$avg_mortality))

# Plot for treatment group
plot_treatment <- ggplot(binned_data, aes(x = Year, y = avg_mortality)) +
  geom_point() + 
  labs(x = "Year", y = "Binned Average Infant Mortality Rate") +
  ggtitle("Binned Average Infant Mortality Rate per Year") +
  xlim(x_limits) + ylim(y_limits)

# Plot for control group
plot_control <- ggplot(binned_data_control, aes(x = Year, y = avg_mortality)) +
  geom_point() + 
  labs(x = "Year", y = "Binned Average Infant Mortality Rate") +
  ggtitle("Binned Average Infant Mortality Rate per Year in Control") +
  xlim(x_limits) + ylim(y_limits)

# View both plots
plot_treatment
plot_control

#________________________________________________
# Parallel Trends with log and in the same plot 

treatment <- data_clean %>% filter(closed_2016 == 1)
control <- data_clean %>% filter(closed_2016 == 0)

# Add a column for log income mortality rate to treatment
treatment <- treatment %>%
  mutate(log_income = log(income))

# Add a column for log infant mortality rate to control
control <- control %>%
  mutate(log_income = log(income))

# Calculate binned averages for log infant mortality rate by year for treatment
binned_data_treatment <- treatment %>%
  group_by(Year) %>%
  summarise(avg_log_income = mean(log_income, na.rm = TRUE)) %>%
  ungroup()

# Calculate binned averages for log infant mortality rate by year for control
binned_data_control <- control %>%
  group_by(Year) %>%
  summarise(avg_log_income = mean(log_income, na.rm = TRUE)) %>%
  ungroup()

# Merge treatment and control data for plotting
combined_data <- bind_rows(
  mutate(binned_data_treatment, Group = "Treatment"),
  mutate(binned_data_control, Group = "Control")
)

# Plot both treatment and control on the same plot
ggplot(combined_data, aes(x = Year, y = avg_log_income, color = Group)) +
  geom_point() +
  geom_line() +
  labs(x = "Year", y = "Binned Average Log Income") +
  ggtitle("Binned Average Log Infant Mortality Rate per Year") +
  scale_color_manual(values = c("blue", "red")) +
  geom_vline(xintercept = 2016, linetype = "dotted", color = "black")  # Add a dotted vertical line at year 2016



#Calculating the Statistical Value of Life 
# _________________________________________________

cleaned_data <- Indiana_Coal_Data[complete.cases(Indiana_Coal_Data[c("Live_Births", "Infant_mortality_rate")]), ]

# Calculating 'infant_deats' only on non-NA rows for 'Live_Births' and 'Infant mortality rate'
cleaned_data$infant_deaths <- cleaned_data$Live_Births * (cleaned_data$Infant_mortality_rate / 1000)

# Caluculate the mortality rate times with 2% reduction in rate and 18% reduction in rate
cleaned_data$low_rate <- cleaned_data$Infant_mortality_rate * 0.98
cleaned_data$high_rate <- cleaned_data$Infant_mortality_rate * 0.82

cleaned_data$high_rate_deaths <- cleaned_data$Live_Births * (cleaned_data$high_rate / 1000)
cleaned_data$low_rate_deaths <- cleaned_data$Live_Births * (cleaned_data$low_rate / 1000)

cleaned_data$high_saved <- cleaned_data$infant_deaths - cleaned_data$high_rate_deats
cleaned_data$low_saved <- cleaned_data$infant_deaths - cleaned_data$low_rate_deats


sum_low_saved_2017 <- sum(cleaned_data$low_saved[cleaned_data$closed_2016 == 1 & cleaned_data$Year == 2017], na.rm = TRUE)
print(sum_low_saved_2017)

sum_high_saved_2017 <- sum(cleaned_data$high_saved[cleaned_data$closed_2016 == 1 & cleaned_data$Year == 2017], na.rm = TRUE)
print(sum_high_saved_2017)

