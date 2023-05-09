from django.shortcuts import render
from datetime import datetime

# Create your views here.

from rest_framework import views, generics
from .models import Employee, MonthPlan
from .serializers import EmployeeSerializer, EmployeesListSerializer, MonthPlanSerializer
from rest_framework.response import Response


class EmployeesListView(views.APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeesListSerializer(employees, many=True)
        return Response(serializer.data)


class EmployeeView(generics.RetrieveAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class MonthPlanView(views.APIView):
    def get(self, request):
        employee_id = request.query_params.get('employee_id')
        datetime_str = request.query_params.get('date')
        request_date = datetime.strptime(datetime_str, '%m/%Y')
        month_plan = MonthPlan.objects.filter(date__year=request_date.year,
            date__month=request_date.month, employee__id=employee_id).first()
        serializer = MonthPlanSerializer(month_plan)
        return Response(serializer.data)
