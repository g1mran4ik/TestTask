from django.urls import path
from .views import EmployeesListView, EmployeeView, MonthPlanView


urlpatterns = [path('employees/', EmployeesListView.as_view()),
               path('employees/<int:pk>', EmployeeView.as_view()),
               path('monthplan/', MonthPlanView.as_view()),]
