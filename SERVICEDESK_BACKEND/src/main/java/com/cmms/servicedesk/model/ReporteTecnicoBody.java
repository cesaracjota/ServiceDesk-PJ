package com.cmms.servicedesk.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class ReporteTecnicoBody {

    private LocalDate startDate;

    private LocalDate endDate;

    private List<Sede> sede;

    public ReporteTecnicoBody(LocalDate startDate, LocalDate endDate, List<Sede> sede) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.sede = sede;
    }

    public ReporteTecnicoBody() {
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public List<Sede> getSede() {
        return sede;
    }

    public void setSede(List<Sede> sede) {
        this.sede = sede;
    }
}
